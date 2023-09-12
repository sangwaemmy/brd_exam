 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_tender_subm;
import com.proc_tender.DTO.MultipleTender_subms;
import com.proc_tender.repository.Tender_submRepository;import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
@RestController
@RequestMapping("/proc_tender/api/tender_subm")
public class Tender_submController {

    @Autowired
    Tender_submRepository tender_submRepository;

     @Value("${upload.path}") 
    private String uploadPath;
    
    
    @ApiOperation("Getting all the Tender_subm only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_tender_subm>> getAll() {
        List<Mdl_tender_subm> struc = new ArrayList<>();
        tender_submRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total tender_subm")
    public long countAll() {
        return tender_submRepository.count();
    }

    @ApiOperation("Creating a tender_subm")
    @PostMapping("/")
    public ResponseEntity<Mdl_tender_subm> createStructure(@RequestBody @Valid Mdl_tender_subm mdl_tender_subm,@RequestParam("image") MultipartFile file) {
        
         try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
             Path filePath = Paths.get(uploadPath).resolve(fileName);

            // Save the file
            file.transferTo(filePath);

            // Create a URL for the uploaded image
//            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                    .path("/download/")
//                    .path(fileName)
//                    .toUriString();

//            return ResponseEntity.ok(fileDownloadUri);
        } catch (IOException e) {
            return null;
        }
        
        
        return new ResponseEntity<>(tender_submRepository.save(mdl_tender_subm), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single tender_subm")
    public ResponseEntity<Mdl_tender_subm> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_tender_subm mdl_tender_subm) {
        Mdl_tender_subm mdl_tender_subm1 = tender_submRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_tender_subm1.setId(mdl_tender_subm.getId());
        mdl_tender_subm1.setDate_time(mdl_tender_subm.getDate_time());
        mdl_tender_subm1.setPath(mdl_tender_subm.getPath());
        mdl_tender_subm1.setDone_by(mdl_tender_subm.getDone_by());
        return new ResponseEntity<>(tender_submRepository.save(mdl_tender_subm), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single tender_subm")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTender_subm(@PathVariable("id") long id) {
        tender_submRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more tender_subms at the same time
    @PostMapping("/multitender_subm")
    public ResponseEntity<String> multipletender_subms(@RequestBody MultipleTender_subms multipleTender_subms) {
        List<Mdl_tender_subm> tender_submsList = multipleTender_subms.getMultiTender_subms();
        try {
            for (Mdl_tender_subm mdl_tender_subm : tender_submsList) {
                tender_submRepository.save(mdl_tender_subm);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

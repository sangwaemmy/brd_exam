 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_tender_resp_att;
import com.proc_tender.DTO.MultipleTender_resp_atts;
import com.proc_tender.repository.Tender_resp_attRepository;import io.swagger.annotations.ApiOperation;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
@RestController
@RequestMapping("/proc_tender/api/tender_resp_att")
public class Tender_resp_attController {

    @Autowired
    Tender_resp_attRepository tender_resp_attRepository;

    @ApiOperation("Getting all the Tender_resp_att only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_tender_resp_att>> getAll() {
        List<Mdl_tender_resp_att> struc = new ArrayList<>();
        tender_resp_attRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total tender_resp_att")
    public long countAll() {
        return tender_resp_attRepository.count();
    }

    @ApiOperation("Creating a tender_resp_att")
    @PostMapping("/")
    public ResponseEntity<Mdl_tender_resp_att> createStructure(@RequestBody @Valid Mdl_tender_resp_att mdl_tender_resp_att) {
        return new ResponseEntity<>(tender_resp_attRepository.save(mdl_tender_resp_att), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single tender_resp_att")
    public ResponseEntity<Mdl_tender_resp_att> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_tender_resp_att mdl_tender_resp_att) {
        Mdl_tender_resp_att mdl_tender_resp_att1 = tender_resp_attRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_tender_resp_att1.setId(mdl_tender_resp_att.getId());
        mdl_tender_resp_att1.setName(mdl_tender_resp_att.getName());
        mdl_tender_resp_att1.setFile_path(mdl_tender_resp_att.getFile_path());
        mdl_tender_resp_att1.setDate_time(mdl_tender_resp_att.getDate_time());
        mdl_tender_resp_att1.setDone_by(mdl_tender_resp_att.getDone_by());
        mdl_tender_resp_att1.setTender_subm(mdl_tender_resp_att.getTender_subm());
        return new ResponseEntity<>(tender_resp_attRepository.save(mdl_tender_resp_att), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single tender_resp_att")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTender_resp_att(@PathVariable("id") long id) {
        tender_resp_attRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more tender_resp_atts at the same time
    @PostMapping("/multitender_resp_att")
    public ResponseEntity<String> multipletender_resp_atts(@RequestBody MultipleTender_resp_atts multipleTender_resp_atts) {
        List<Mdl_tender_resp_att> tender_resp_attsList = multipleTender_resp_atts.getMultiTender_resp_atts();
        try {
            for (Mdl_tender_resp_att mdl_tender_resp_att : tender_resp_attsList) {
                tender_resp_attRepository.save(mdl_tender_resp_att);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

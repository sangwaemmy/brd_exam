 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_tender_resp;
import com.proc_tender.DTO.MultipleTender_resps;
import com.proc_tender.repository.Tender_respRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/tender_resp")
public class Tender_respController {

    @Autowired
    Tender_respRepository tender_respRepository;

    @ApiOperation("Getting all the Tender_resp only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_tender_resp>> getAll() {
        List<Mdl_tender_resp> struc = new ArrayList<>();
        tender_respRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total tender_resp")
    public long countAll() {
        return tender_respRepository.count();
    }

    @ApiOperation("Creating a tender_resp")
    @PostMapping("/")
    public ResponseEntity<Mdl_tender_resp> createStructure(@RequestBody @Valid Mdl_tender_resp mdl_tender_resp) {
        return new ResponseEntity<>(tender_respRepository.save(mdl_tender_resp), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single tender_resp")
    public ResponseEntity<Mdl_tender_resp> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_tender_resp mdl_tender_resp) {
        Mdl_tender_resp mdl_tender_resp1 = tender_respRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_tender_resp1.setId(mdl_tender_resp.getId());
        mdl_tender_resp1.setTender_subm(mdl_tender_resp.getTender_subm());
        mdl_tender_resp1.setResponse(mdl_tender_resp.getResponse());
        mdl_tender_resp1.setDone_by(mdl_tender_resp.getDone_by());
        return new ResponseEntity<>(tender_respRepository.save(mdl_tender_resp), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single tender_resp")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTender_resp(@PathVariable("id") long id) {
        tender_respRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more tender_resps at the same time
    @PostMapping("/multitender_resp")
    public ResponseEntity<String> multipletender_resps(@RequestBody MultipleTender_resps multipleTender_resps) {
        List<Mdl_tender_resp> tender_respsList = multipleTender_resps.getMultiTender_resps();
        try {
            for (Mdl_tender_resp mdl_tender_resp : tender_respsList) {
                tender_respRepository.save(mdl_tender_resp);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_tender_req;
import com.proc_tender.DTO.MultipleTender_reqs;
import com.proc_tender.repository.Tender_reqRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/tender_req")
public class Tender_reqController {

    @Autowired
    Tender_reqRepository tender_reqRepository;

    @ApiOperation("Getting all the Tender_req only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_tender_req>> getAll() {
        List<Mdl_tender_req> struc = new ArrayList<>();
        tender_reqRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total tender_req")
    public long countAll() {
        return tender_reqRepository.count();
    }

    @ApiOperation("Creating a tender_req")
    @PostMapping("/")
    public ResponseEntity<Mdl_tender_req> createStructure(@RequestBody @Valid Mdl_tender_req mdl_tender_req) {
        return new ResponseEntity<>(tender_reqRepository.save(mdl_tender_req), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single tender_req")
    public ResponseEntity<Mdl_tender_req> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_tender_req mdl_tender_req) {
        Mdl_tender_req mdl_tender_req1 = tender_reqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_tender_req1.setId(mdl_tender_req.getId());
        mdl_tender_req1.setDone_by(mdl_tender_req.getDone_by());
        mdl_tender_req1.setTender_subm(mdl_tender_req.getTender_subm());
        mdl_tender_req1.setDate_time(mdl_tender_req.getDate_time());
        mdl_tender_req1.setSpecification(mdl_tender_req.getSpecification());
        mdl_tender_req1.setDeadline(mdl_tender_req.getDeadline());
        mdl_tender_req1.setStatus(mdl_tender_req.getStatus());
        return new ResponseEntity<>(tender_reqRepository.save(mdl_tender_req), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single tender_req")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTender_req(@PathVariable("id") long id) {
        tender_reqRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more tender_reqs at the same time
    @PostMapping("/multitender_req")
    public ResponseEntity<String> multipletender_reqs(@RequestBody MultipleTender_reqs multipleTender_reqs) {
        List<Mdl_tender_req> tender_reqsList = multipleTender_reqs.getMultiTender_reqs();
        try {
            for (Mdl_tender_req mdl_tender_req : tender_reqsList) {
                tender_reqRepository.save(mdl_tender_req);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

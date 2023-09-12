 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_criteria_tender;
import com.proc_tender.DTO.MultipleCriteria_tenders;
import com.proc_tender.repository.Criteria_tenderRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/criteria_tender")
public class Criteria_tenderController {

    @Autowired
    Criteria_tenderRepository criteria_tenderRepository;

    @ApiOperation("Getting all the Criteria_tender only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_criteria_tender>> getAll() {
        List<Mdl_criteria_tender> struc = new ArrayList<>();
        criteria_tenderRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total criteria_tender")
    public long countAll() {
        return criteria_tenderRepository.count();
    }

    @ApiOperation("Creating a criteria_tender")
    @PostMapping("/")
    public ResponseEntity<Mdl_criteria_tender> createStructure(@RequestBody @Valid Mdl_criteria_tender mdl_criteria_tender) {
        return new ResponseEntity<>(criteria_tenderRepository.save(mdl_criteria_tender), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single criteria_tender")
    public ResponseEntity<Mdl_criteria_tender> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_criteria_tender mdl_criteria_tender) {
        Mdl_criteria_tender mdl_criteria_tender1 = criteria_tenderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_criteria_tender1.setId(mdl_criteria_tender.getId());
        mdl_criteria_tender1.setTender_subm(mdl_criteria_tender.getTender_subm());
        return new ResponseEntity<>(criteria_tenderRepository.save(mdl_criteria_tender), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single criteria_tender")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCriteria_tender(@PathVariable("id") long id) {
        criteria_tenderRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more criteria_tenders at the same time
    @PostMapping("/multicriteria_tender")
    public ResponseEntity<String> multiplecriteria_tenders(@RequestBody MultipleCriteria_tenders multipleCriteria_tenders) {
        List<Mdl_criteria_tender> criteria_tendersList = multipleCriteria_tenders.getMultiCriteria_tenders();
        try {
            for (Mdl_criteria_tender mdl_criteria_tender : criteria_tendersList) {
                criteria_tenderRepository.save(mdl_criteria_tender);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

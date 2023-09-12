 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_criteria;
import com.proc_tender.DTO.MultipleCriterias;
import com.proc_tender.repository.CriteriaRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/criteria")
public class CriteriaController {

    @Autowired
    CriteriaRepository criteriaRepository;

    @ApiOperation("Getting all the Criteria only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_criteria>> getAll() {
        List<Mdl_criteria> struc = new ArrayList<>();
        criteriaRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total criteria")
    public long countAll() {
        return criteriaRepository.count();
    }

    @ApiOperation("Creating a criteria")
    @PostMapping("/")
    public ResponseEntity<Mdl_criteria> createStructure(@RequestBody @Valid Mdl_criteria mdl_criteria) {
        return new ResponseEntity<>(criteriaRepository.save(mdl_criteria), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single criteria")
    public ResponseEntity<Mdl_criteria> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_criteria mdl_criteria) {
        Mdl_criteria mdl_criteria1 = criteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_criteria1.setId(mdl_criteria.getId());
        mdl_criteria1.setName(mdl_criteria.getName());
        return new ResponseEntity<>(criteriaRepository.save(mdl_criteria), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single criteria")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCriteria(@PathVariable("id") long id) {
        criteriaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more criterias at the same time
    @PostMapping("/multicriteria")
    public ResponseEntity<String> multiplecriterias(@RequestBody MultipleCriterias multipleCriterias) {
        List<Mdl_criteria> criteriasList = multipleCriterias.getMultiCriterias();
        try {
            for (Mdl_criteria mdl_criteria : criteriasList) {
                criteriaRepository.save(mdl_criteria);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_tender_eval;
import com.proc_tender.DTO.MultipleTender_evals;
import com.proc_tender.repository.Tender_evalRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/tender_eval")
public class Tender_evalController {

    @Autowired
    Tender_evalRepository tender_evalRepository;

    @ApiOperation("Getting all the Tender_eval only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_tender_eval>> getAll() {
        List<Mdl_tender_eval> struc = new ArrayList<>();
        tender_evalRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total tender_eval")
    public long countAll() {
        return tender_evalRepository.count();
    }

    @ApiOperation("Creating a tender_eval")
    @PostMapping("/")
    public ResponseEntity<Mdl_tender_eval> createStructure(@RequestBody @Valid Mdl_tender_eval mdl_tender_eval) {
        return new ResponseEntity<>(tender_evalRepository.save(mdl_tender_eval), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single tender_eval")
    public ResponseEntity<Mdl_tender_eval> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_tender_eval mdl_tender_eval) {
        Mdl_tender_eval mdl_tender_eval1 = tender_evalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_tender_eval1.setId(mdl_tender_eval.getId());
        mdl_tender_eval1.setTender_subm(mdl_tender_eval.getTender_subm());
        
        return new ResponseEntity<>(tender_evalRepository.save(mdl_tender_eval), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single tender_eval")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTender_eval(@PathVariable("id") long id) {
        tender_evalRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more tender_evals at the same time
    @PostMapping("/multitender_eval")
    public ResponseEntity<String> multipletender_evals(@RequestBody MultipleTender_evals multipleTender_evals) {
        List<Mdl_tender_eval> tender_evalsList = multipleTender_evals.getMultiTender_evals();
        try {
            for (Mdl_tender_eval mdl_tender_eval : tender_evalsList) {
                tender_evalRepository.save(mdl_tender_eval);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

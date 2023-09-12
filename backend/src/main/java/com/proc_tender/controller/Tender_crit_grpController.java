 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_tender_crit_grp;
import com.proc_tender.DTO.MultipleTender_crit_grps;
import com.proc_tender.repository.Tender_crit_grpRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/tender_crit_grp")
public class Tender_crit_grpController {

    @Autowired
    Tender_crit_grpRepository tender_crit_grpRepository;

    @ApiOperation("Getting all the Tender_crit_grp only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_tender_crit_grp>> getAll() {
        List<Mdl_tender_crit_grp> struc = new ArrayList<>();
        tender_crit_grpRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total tender_crit_grp")
    public long countAll() {
        return tender_crit_grpRepository.count();
    }

    @ApiOperation("Creating a tender_crit_grp")
    @PostMapping("/")
    public ResponseEntity<Mdl_tender_crit_grp> createStructure(@RequestBody @Valid Mdl_tender_crit_grp mdl_tender_crit_grp) {
        return new ResponseEntity<>(tender_crit_grpRepository.save(mdl_tender_crit_grp), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single tender_crit_grp")
    public ResponseEntity<Mdl_tender_crit_grp> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_tender_crit_grp mdl_tender_crit_grp) {
        Mdl_tender_crit_grp mdl_tender_crit_grp1 = tender_crit_grpRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_tender_crit_grp1.setId(mdl_tender_crit_grp.getId());
        mdl_tender_crit_grp1.setName(mdl_tender_crit_grp.getName());
        return new ResponseEntity<>(tender_crit_grpRepository.save(mdl_tender_crit_grp), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single tender_crit_grp")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTender_crit_grp(@PathVariable("id") long id) {
        tender_crit_grpRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more tender_crit_grps at the same time
    @PostMapping("/multitender_crit_grp")
    public ResponseEntity<String> multipletender_crit_grps(@RequestBody MultipleTender_crit_grps multipleTender_crit_grps) {
        List<Mdl_tender_crit_grp> tender_crit_grpsList = multipleTender_crit_grps.getMultiTender_crit_grps();
        try {
            for (Mdl_tender_crit_grp mdl_tender_crit_grp : tender_crit_grpsList) {
                tender_crit_grpRepository.save(mdl_tender_crit_grp);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

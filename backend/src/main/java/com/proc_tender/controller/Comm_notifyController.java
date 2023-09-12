 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_comm_notify;
import com.proc_tender.DTO.MultipleComm_notifys;
import com.proc_tender.repository.Comm_notifyRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/comm_notify")
public class Comm_notifyController {

    @Autowired
    Comm_notifyRepository comm_notifyRepository;

    @ApiOperation("Getting all the Comm_notify only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_comm_notify>> getAll() {
        List<Mdl_comm_notify> struc = new ArrayList<>();
        comm_notifyRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total comm_notify")
    public long countAll() {
        return comm_notifyRepository.count();
    }

    @ApiOperation("Creating a comm_notify")
    @PostMapping("/")
    public ResponseEntity<Mdl_comm_notify> createStructure(@RequestBody @Valid Mdl_comm_notify mdl_comm_notify) {
        return new ResponseEntity<>(comm_notifyRepository.save(mdl_comm_notify), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single comm_notify")
    public ResponseEntity<Mdl_comm_notify> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_comm_notify mdl_comm_notify) {
        Mdl_comm_notify mdl_comm_notify1 = comm_notifyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_comm_notify1.setId(mdl_comm_notify.getId());
        mdl_comm_notify1.setDate_time(mdl_comm_notify.getDate_time());
        mdl_comm_notify1.setUser(mdl_comm_notify.getUser());
        mdl_comm_notify1.setTender_status(mdl_comm_notify.getTender_status());
        mdl_comm_notify1.setTender_subm(mdl_comm_notify.getTender_subm());
        return new ResponseEntity<>(comm_notifyRepository.save(mdl_comm_notify), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single comm_notify")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteComm_notify(@PathVariable("id") long id) {
        comm_notifyRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more comm_notifys at the same time
    @PostMapping("/multicomm_notify")
    public ResponseEntity<String> multiplecomm_notifys(@RequestBody MultipleComm_notifys multipleComm_notifys) {
        List<Mdl_comm_notify> comm_notifysList = multipleComm_notifys.getMultiComm_notifys();
        try {
            for (Mdl_comm_notify mdl_comm_notify : comm_notifysList) {
                comm_notifyRepository.save(mdl_comm_notify);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

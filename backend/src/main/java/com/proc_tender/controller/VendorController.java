 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_vendor;
import com.proc_tender.DTO.MultipleVendors;
import com.proc_tender.repository.VendorRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/vendor")
public class VendorController {

    @Autowired
    VendorRepository vendorRepository;

    @ApiOperation("Getting all the Vendor only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_vendor>> getAll() {
        List<Mdl_vendor> struc = new ArrayList<>();
        vendorRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total vendor")
    public long countAll() {
        return vendorRepository.count();
    }

    @ApiOperation("Creating a vendor")
    @PostMapping("/")
    public ResponseEntity<Mdl_vendor> createStructure(@RequestBody @Valid Mdl_vendor mdl_vendor) {
        return new ResponseEntity<>(vendorRepository.save(mdl_vendor), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single vendor")
    public ResponseEntity<Mdl_vendor> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_vendor mdl_vendor) {
        Mdl_vendor mdl_vendor1 = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_vendor1.setId(mdl_vendor.getId());
        mdl_vendor1.setCapabilities(mdl_vendor.getCapabilities());
        return new ResponseEntity<>(vendorRepository.save(mdl_vendor), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single vendor")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteVendor(@PathVariable("id") long id) {
        vendorRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more vendors at the same time
    @PostMapping("/multivendor")
    public ResponseEntity<String> multiplevendors(@RequestBody MultipleVendors multipleVendors) {
        List<Mdl_vendor> vendorsList = multipleVendors.getMultiVendors();
        try {
            for (Mdl_vendor mdl_vendor : vendorsList) {
                vendorRepository.save(mdl_vendor);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

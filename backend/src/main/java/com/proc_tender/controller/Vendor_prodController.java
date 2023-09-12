 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_vendor_prod;
import com.proc_tender.DTO.MultipleVendor_prods;
import com.proc_tender.repository.Vendor_prodRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/vendor_prod")
public class Vendor_prodController {

    @Autowired
    Vendor_prodRepository vendor_prodRepository;

    @ApiOperation("Getting all the Vendor_prod only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_vendor_prod>> getAll() {
        List<Mdl_vendor_prod> struc = new ArrayList<>();
        vendor_prodRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total vendor_prod")
    public long countAll() {
        return vendor_prodRepository.count();
    }

    @ApiOperation("Creating a vendor_prod")
    @PostMapping("/")
    public ResponseEntity<Mdl_vendor_prod> createStructure(@RequestBody @Valid Mdl_vendor_prod mdl_vendor_prod) {
        return new ResponseEntity<>(vendor_prodRepository.save(mdl_vendor_prod), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single vendor_prod")
    public ResponseEntity<Mdl_vendor_prod> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_vendor_prod mdl_vendor_prod) {
        Mdl_vendor_prod mdl_vendor_prod1 = vendor_prodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_vendor_prod1.setId(mdl_vendor_prod.getId());
        mdl_vendor_prod1.setName(mdl_vendor_prod.getName());
        mdl_vendor_prod1.setDescription(mdl_vendor_prod.getDescription());
        mdl_vendor_prod1.setVendor(mdl_vendor_prod.getVendor());
        return new ResponseEntity<>(vendor_prodRepository.save(mdl_vendor_prod), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single vendor_prod")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteVendor_prod(@PathVariable("id") long id) {
        vendor_prodRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more vendor_prods at the same time
    @PostMapping("/multivendor_prod")
    public ResponseEntity<String> multiplevendor_prods(@RequestBody MultipleVendor_prods multipleVendor_prods) {
        List<Mdl_vendor_prod> vendor_prodsList = multipleVendor_prods.getMultiVendor_prods();
        try {
            for (Mdl_vendor_prod mdl_vendor_prod : vendor_prodsList) {
                vendor_prodRepository.save(mdl_vendor_prod);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

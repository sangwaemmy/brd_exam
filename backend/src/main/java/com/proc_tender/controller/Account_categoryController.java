 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_account_category;
import com.proc_tender.DTO.MultipleAccount_categorys;
import com.proc_tender.repository.Account_categoryRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/account_category")
public class Account_categoryController {

    @Autowired
    Account_categoryRepository account_categoryRepository;

    @ApiOperation("Getting all the Account_category only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_account_category>> getAll() {
        List<Mdl_account_category> struc = new ArrayList<>();
        account_categoryRepository.findAll().forEach(struc::add);
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total account_category")
    public long countAll() {
        return account_categoryRepository.count();
    }

    @ApiOperation("Creating a account_category")
    @PostMapping("/")
    public ResponseEntity<Mdl_account_category> createStructure(@RequestBody @Valid Mdl_account_category mdl_account_category) {
        return new ResponseEntity<>(account_categoryRepository.save(mdl_account_category), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single account_category")
    public ResponseEntity<Mdl_account_category> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_account_category mdl_account_category) {
        Mdl_account_category mdl_account_category1 = account_categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_account_category1.setId(mdl_account_category.getId());
        mdl_account_category1.setName(mdl_account_category.getName());
        return new ResponseEntity<>(account_categoryRepository.save(mdl_account_category), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single account_category")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAccount_category(@PathVariable("id") long id) {
        account_categoryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more account_categorys at the same time
    @PostMapping("/multiaccount_category")
    public ResponseEntity<String> multipleaccount_categorys(@RequestBody MultipleAccount_categorys multipleAccount_categorys) {
        List<Mdl_account_category> account_categorysList = multipleAccount_categorys.getMultiAccount_categorys();
        try {
            for (Mdl_account_category mdl_account_category : account_categorysList) {
                account_categoryRepository.save(mdl_account_category);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

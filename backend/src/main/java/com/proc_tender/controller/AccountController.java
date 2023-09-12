package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.DTO.MultipleAccounts;
import com.proc_tender.jwtsecurity.User;
import com.proc_tender.models.UserDetailsResponse;
import com.proc_tender.repository.AccountRepository;
import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/account")
//               /proc_tender/api/account
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @ApiOperation("Getting all the Account only")
    @GetMapping()
    public ResponseEntity<List<User>> getAll() {
        List<User> struc = new ArrayList<>();
        accountRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

    @ApiOperation("Total account")
    public long countAll() {
        return accountRepository.count();
    }

    @ApiOperation("Creating a account")
    @PostMapping("/")
    public ResponseEntity<User> createStructure(@RequestBody @Valid User mdl_account) {
        return new ResponseEntity<>(accountRepository.save(mdl_account), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single account")
    public ResponseEntity<User> updateStructure(@PathVariable(value = "id") long id, @RequestBody User mdl_account) {
        User mdl_account1 = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_account1.setId(mdl_account.getId());
        mdl_account1.setUsername(mdl_account.getUsername());
        mdl_account1.setPassword(mdl_account.getPassword());
//        mdl_account1.setAccount_category(mdl_account.getAccount_category());
//        mdl_account1.setProfile(mdl_account.getProfile());
        return new ResponseEntity<>(accountRepository.save(mdl_account), HttpStatus.OK);
    }

    @ApiOperation(value = "Deleting  a single account")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAccount(@PathVariable("id") long id) {
        accountRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
@GetMapping("/users/byStatus/{status}")
    public List<UserDetailsResponse> getAccountByStatus(@PathVariable String status) {
        return accountRepository.findUserAndProfileByStatus(status);
    }
//    Adding more accounts at the same time
    @PostMapping("/multiaccount")
    public ResponseEntity<String> multipleaccounts(@RequestBody MultipleAccounts multipleAccounts) {
        List<User> accountsList = multipleAccounts.getMultiAccounts();
        try {
            for (User mdl_account : accountsList) {
                accountRepository.save(mdl_account);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error " + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

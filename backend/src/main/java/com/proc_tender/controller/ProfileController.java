 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_profile;
import com.proc_tender.DTO.MultipleProfiles;
import com.proc_tender.repository.ProfileRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/profile")
public class ProfileController {

    @Autowired
    ProfileRepository profileRepository;

    @ApiOperation("Getting all the Profile only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_profile>> getAll() {
        List<Mdl_profile> struc = new ArrayList<>();
        profileRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total profile")
    public long countAll() {
        return profileRepository.count();
    }

    @ApiOperation("Creating a profile")
    @PostMapping("/")
    public ResponseEntity<Mdl_profile> createStructure(@RequestBody @Valid Mdl_profile mdl_profile) {
        return new ResponseEntity<>(profileRepository.save(mdl_profile), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single profile")
    public ResponseEntity<Mdl_profile> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_profile mdl_profile) {
        Mdl_profile mdl_profile1 = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_profile1.setId(mdl_profile.getId());
        mdl_profile1.setName(mdl_profile.getName());
        mdl_profile1.setSurname(mdl_profile.getSurname());
        mdl_profile1.setGender(mdl_profile.getGender());
        return new ResponseEntity<>(profileRepository.save(mdl_profile), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single profile")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProfile(@PathVariable("id") long id) {
        profileRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more profiles at the same time
    @PostMapping("/multiprofile")
    public ResponseEntity<String> multipleprofiles(@RequestBody MultipleProfiles multipleProfiles) {
        List<Mdl_profile> profilesList = multipleProfiles.getMultiProfiles();
        try {
            for (Mdl_profile mdl_profile : profilesList) {
                profileRepository.save(mdl_profile);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

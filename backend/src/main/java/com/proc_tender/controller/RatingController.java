 
package com.proc_tender.controller;

import com.proc_tender.exception.ResourceNotFoundException;
import com.proc_tender.models.Mdl_rating;
import com.proc_tender.DTO.MultipleRatings;
import com.proc_tender.repository.RatingRepository;import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/proc_tender/api/rating")
public class RatingController {

    @Autowired
    RatingRepository ratingRepository;

    @ApiOperation("Getting all the Rating only")
    @GetMapping("/")
    public  ResponseEntity<List<Mdl_rating>> getAll() {
        List<Mdl_rating> struc = new ArrayList<>();
        ratingRepository.findAll().forEach(struc::add);
        if (struc.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(struc, HttpStatus.OK);
    }

     @ApiOperation("Total rating")
    public long countAll() {
        return ratingRepository.count();
    }

    @ApiOperation("Creating a rating")
    @PostMapping("/")
    public ResponseEntity<Mdl_rating> createStructure(@RequestBody @Valid Mdl_rating mdl_rating) {
        return new ResponseEntity<>(ratingRepository.save(mdl_rating), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Updating  a single rating")
    public ResponseEntity<Mdl_rating> updateStructure(@PathVariable(value = "id") long id, @RequestBody Mdl_rating mdl_rating) {
        Mdl_rating mdl_rating1 = ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Structure not found"));
        mdl_rating1.setId(mdl_rating.getId());
        mdl_rating1.setDate_time(mdl_rating.getDate_time());
        mdl_rating1.setTender_subm(mdl_rating.getTender_subm());
        mdl_rating1.setScore(mdl_rating.getScore());
        mdl_rating1.setDone_by(mdl_rating.getDone_by());
        return new ResponseEntity<>(ratingRepository.save(mdl_rating), HttpStatus.OK);

    }

    @ApiOperation(value = "Deleting  a single rating")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRating(@PathVariable("id") long id) {
        ratingRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    Adding more ratings at the same time
    @PostMapping("/multirating")
    public ResponseEntity<String> multipleratings(@RequestBody MultipleRatings multipleRatings) {
        List<Mdl_rating> ratingsList = multipleRatings.getMultiRatings();
        try {
            for (Mdl_rating mdl_rating : ratingsList) {
                ratingRepository.save(mdl_rating);
            }
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Saved", HttpStatus.OK);
            return responseEntity;
        } catch (Exception e) {
            System.out.println("Error "  + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

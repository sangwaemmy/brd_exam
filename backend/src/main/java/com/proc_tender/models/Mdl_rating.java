package com.proc_tender.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rating")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_rating implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " date_time should not be empty, null and or length exceed 70")
    @Column(name = "date_time"  ,length=80 , nullable = false)
    private String date_time;
  
    @Size(min = 1, max = 70, message = " tender_subm should not be empty, null and or length exceed 70")
    @Column(name = "tender_subm"  ,length=80 , nullable = false)
    private Integer tender_subm;
  
    @Size(min = 1, max = 70, message = " score should not be empty, null and or length exceed 70")
    @Column(name = "score"  ,length=80 , nullable = false)
    private Integer score;
  
    @Size(min = 1, max = 70, message = " done_by should not be empty, null and or length exceed 70")
    @Column(name = "done_by"  ,length=80 , nullable = false)
    private Integer done_by;

    public Mdl_rating() {
    }


   @ManyToOne
    @JoinColumn(name = "tender_subm_id", nullable = true)
    Mdl_tender_subm mdl_tender_subm;

}

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
@Table(name = "tender_resp")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_tender_resp implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " tender_subm should not be empty, null and or length exceed 70")
    @Column(name = "tender_subm"  ,length=80 , nullable = false)
    private Integer tender_subm;
  
    @Size(min = 1, max = 70, message = " response should not be empty, null and or length exceed 70")
    @Column(name = "response"  ,length=80 , nullable = false)
    private String response;
  
    @Size(min = 1, max = 70, message = " done_by should not be empty, null and or length exceed 70")
    @Column(name = "done_by"  ,length=80 , nullable = false)
    private Integer done_by;

    public Mdl_tender_resp() {
    }


   @ManyToOne
    @JoinColumn(name = "tender_subm_id", nullable = true)
    Mdl_tender_subm mdl_tender_subm;

}

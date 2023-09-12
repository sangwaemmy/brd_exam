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
@Table(name = "tender_resp_att")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_tender_resp_att implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " name should not be empty, null and or length exceed 70")
    @Column(name = "name"  ,length=80 , nullable = false)
    private String name;
  
    @Size(min = 1, max = 70, message = " file_path should not be empty, null and or length exceed 70")
    @Column(name = "file_path"  ,length=80 , nullable = false)
    private String file_path;
  
    @Size(min = 1, max = 70, message = " date_time should not be empty, null and or length exceed 70")
    @Column(name = "date_time"  ,length=80 , nullable = false)
    private String date_time;
  
    @Size(min = 1, max = 70, message = " done_by should not be empty, null and or length exceed 70")
    @Column(name = "done_by"  ,length=80 , nullable = false)
    private Integer done_by;
  
    @Size(min = 1, max = 70, message = " tender_subm should not be empty, null and or length exceed 70")
    @Column(name = "tender_subm"  ,length=80 , nullable = false)
    private Integer tender_subm;

    public Mdl_tender_resp_att() {
    }


   @ManyToOne
    @JoinColumn(name = "tender_subm_id", nullable = true)
    Mdl_tender_subm mdl_tender_subm;

}

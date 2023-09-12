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
import com.proc_tender.jwtsecurity.User;

@Entity
@Table(name = "tender_req")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_tender_req implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " done_by should not be empty, null and or length exceed 70")
    @Column(name = "done_by"  ,length=80 , nullable = false)
    private Integer done_by;
  
    @Size(min = 1, max = 70, message = " tender_subm should not be empty, null and or length exceed 70")
    @Column(name = "tender_subm"  ,length=80 , nullable = false)
    private String tender_subm;
  
    @Size(min = 1, max = 70, message = " date_time should not be empty, null and or length exceed 70")
    @Column(name = "date_time"  ,length=80 , nullable = false)
    private String date_time;
  
    @Size(min = 1, max = 70, message = " specification should not be empty, null and or length exceed 70")
    @Column(name = "specification"  ,length=80 , nullable = false)
    private String specification;
  
    @Size(min = 1, max = 70, message = " deadline should not be empty, null and or length exceed 70")
    @Column(name = "deadline"  ,length=80 , nullable = false)
    private String deadline;
  
    @Size(min = 1, max = 70, message = " status should not be empty, null and or length exceed 70")
    @Column(name = "status"  ,length=80 , nullable = false)
    private String status;

    public Mdl_tender_req() {
    }


   @ManyToOne
    @JoinColumn(name = "account_id", nullable = true)
    User mdl_account;

}

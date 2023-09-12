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
@Table(name = "comm_notify")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_comm_notify implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " date_time should not be empty, null and or length exceed 70")
    @Column(name = "date_time"  ,length=80 , nullable = false)
    private String date_time;
  
    @Size(min = 1, max = 70, message = " user should not be empty, null and or length exceed 70")
    @Column(name = "user"  ,length=80 , nullable = false)
    private Integer user;
  
    @Size(min = 1, max = 70, message = " tender_status should not be empty, null and or length exceed 70")
    @Column(name = "tender_status"  ,length=80 , nullable = false)
    private String tender_status;
  
    @Size(min = 1, max = 70, message = " tender_subm should not be empty, null and or length exceed 70")
    @Column(name = "tender_subm"  ,length=80 , nullable = false)
    private Integer tender_subm;

    public Mdl_comm_notify() {
    }


   @ManyToOne
    @JoinColumn(name = "account_id", nullable = true)
    User mdl_account;


   @ManyToOne
    @JoinColumn(name = "tender_subm_id", nullable = true)
    Mdl_tender_subm mdl_tender_subm;

}

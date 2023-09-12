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
@Table(name = "tender_subm")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_tender_subm implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " date_time should not be empty, null and or length exceed 70")
    @Column(name = "date_time"  ,length=80 , nullable = false)
    private String date_time;
  
    @Size(min = 1, max = 70, message = " path should not be empty, null and or length exceed 70")
    @Column(name = "path"  ,length=80 , nullable = false)
    private String path;
  
    @Size(min = 1, max = 70, message = " done_by should not be empty, null and or length exceed 70")
    @Column(name = "done_by"  ,length=80 , nullable = false)
    private Integer done_by;

    public Mdl_tender_subm() {
    }


   @ManyToOne
    @JoinColumn(name = "account_id", nullable = true)
    User mdl_account;


   @OneToMany(mappedBy = "mdl_tender_subm", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_tender_resp> o_tender_resps;


   @OneToMany(mappedBy = "mdl_tender_subm", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_tender_resp_att> o_tender_resp_atts;


   @OneToMany(mappedBy = "mdl_tender_subm", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_tender_eval> o_tender_evals;


   @OneToMany(mappedBy = "mdl_tender_subm", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_criteria_tender> o_criteria_tenders;


   @OneToMany(mappedBy = "mdl_tender_subm", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_rating> o_ratings;


   @OneToMany(mappedBy = "mdl_tender_subm", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_comm_notify> o_comm_notifys;

}

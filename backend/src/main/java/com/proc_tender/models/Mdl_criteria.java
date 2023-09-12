package com.proc_tender.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "criteria")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_criteria implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(min = 1, max = 70, message = " name should not be empty, null and or length exceed 70")
    @Column(name = "name", length = 80, nullable = false)
    private String name;

    public Mdl_criteria(String name, Mdl_tender_crit_grp mdl_tender_crit_grp) {
        this.name = name;
        this.mdl_tender_crit_grp = mdl_tender_crit_grp;
    }

   
    

    public Mdl_criteria() {
    }

    @ManyToOne
    @JoinColumn(name = "tender_crit_grp_id", nullable = true)
    Mdl_tender_crit_grp mdl_tender_crit_grp;

    @OneToMany(mappedBy = "mdl_criteria", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_tender_eval> o_tender_evals;

    @OneToMany(mappedBy = "mdl_criteria", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_criteria_tender> o_criteria_tenders;

}

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
@Table(name = "account_category")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_account_category implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " name should not be empty, null and or length exceed 70")
    @Column(name = "name"  ,length=80 , nullable = false)
    private String name;

    public Mdl_account_category() {
    }
    public Mdl_account_category(String name) {
        this.name = name;
    }
    
}

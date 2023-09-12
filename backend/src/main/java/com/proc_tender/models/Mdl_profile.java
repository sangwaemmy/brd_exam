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
@Table(name = "profile")
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mdl_profile implements Serializable {



    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id"   , nullable = false)
    private Integer id;
  
    @Size(min = 1, max = 70, message = " name should not be empty, null and or length exceed 70")
    @Column(name = "name"  ,length=80 , nullable = false)
    private String name;
  
    @Size(min = 1, max = 70, message = " surname should not be empty, null and or length exceed 70")
    @Column(name = "surname"  ,length=80 , nullable = false)
    private String surname;
  
    @Size(min = 1, max = 70, message = " gender should not be empty, null and or length exceed 70")
    @Column(name = "gender"  ,length=80 , nullable = false)
    private String gender;

    public Mdl_profile() {
    }
  public Mdl_profile(String name, String surname, String gender) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
    }
    
}

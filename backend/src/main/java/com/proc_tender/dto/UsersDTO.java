/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proc_tender.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsersDTO {

    
    private long id;
    //profile
    private String name;
    private String surname;
    private String gender;
    //category
    private Long account_category_id;
    private String catname;

    //account
    private String username;
    private String password;

    
    
}

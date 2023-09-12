/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proc_tender.models;

import javax.persistence.Column;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse {
    private long id;
    private String username;
    private String password;
    private String catname;
    private String name;
    private String surname;
    private String status;
    
    
}

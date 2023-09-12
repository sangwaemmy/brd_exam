/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proc_tender.repository;

import com.proc_tender.dto.UsersDTO;
import com.proc_tender.jwtsecurity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select a.id,    p.name, p.surname, p.gender,   a.account_category_id,  c.name as catname,  a.username, a.password "
            + " from account a  "
            + " join account_category c on c.id = a.account_category_id"
            + " join profile p on p.id = a.profile_id ", nativeQuery = true)
    public List<UsersDTO> userDetails();
    
    
    @Query(value = "select * from account a "
            + " where a.password=? and a.id=?", nativeQuery = true)
   public  User findUserByPasswordandBYId(String password, long id);
   
}

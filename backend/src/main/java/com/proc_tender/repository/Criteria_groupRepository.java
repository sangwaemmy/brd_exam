/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.proc_tender.repository;

import com.proc_tender.jwtsecurity.User;
import com.proc_tender.models.Mdl_criteria_group;
import com.proc_tender.models.Mdl_tender_crit_grp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
@Repository
public interface Criteria_groupRepository extends JpaRepository<Mdl_tender_crit_grp, Long>{
    @Query(value = "select c.* from tender_crit_grp c order by id desc limit 1", nativeQuery = true)
    public Mdl_tender_crit_grp findLastcriteriaGroup();
}

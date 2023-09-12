package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_account_category;
import org.springframework.data.jpa.repository.Query;
@Repository
public interface Account_categoryRepository extends JpaRepository<Mdl_account_category, Long> {
    
    @Query(value = "select id, name from account_category  order by id desc limit 1", nativeQuery = true)
    public Mdl_account_category findLastcategory();

    @Query(value = "select c.* from account_category c where c.name=? ", nativeQuery = true)
    public Mdl_account_category findcategoryByName(String name);

}


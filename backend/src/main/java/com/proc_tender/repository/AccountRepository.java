package com.proc_tender.repository;

import com.proc_tender.jwtsecurity.User;
import com.proc_tender.models.Mdl_account_category;
import com.proc_tender.models.UserDetailsResponse;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<User, Long> {
    
    @Query(value = "select c.* from account_category c where c.name=?  ", nativeQuery = true)
    public Mdl_account_category userCategoryByName(String name);
    //get category id by name

    @Query(" SELECT new com.proc_tender.models.UserDetailsResponse ( a.id, a.username, a.password, ac.name as catname, p.name, p.surname, a.status ) "
            + " from User  a"
            + " join a.mdl_profile  p "
            + " join a.mdl_account_category  ac")
    public List<UserDetailsResponse> findUserAndProfile();
    
    @Query(" SELECT new com.proc_tender.models.UserDetailsResponse ( a.id, a.username, a.password, ac.name as catname, p.name, p.surname, a.status ) "
            + " from User  a"
            + " join a.mdl_profile  p "
            + " join a.mdl_account_category  ac"
            + " where status= ?1 ")
    public List<UserDetailsResponse> findUserAndProfileByStatus(String status);
    
        public User findByUsername(String username);

    @Query(" SELECT new com.proc_tender.models.UserDetailsResponse ( a.id, a.username, a.password, ac.name as catname, p.name, p.surname, a.status ) "
            + " from User  a"
            + " join a.mdl_profile  p "
            + " join a.mdl_account_category  ac "
            + " where a.username = ?1 and status= ?2 ")
    public UserDetailsResponse findUserAndProfile(  String username, String status);

}


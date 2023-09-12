package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_profile;
import org.springframework.data.jpa.repository.Query;
@Repository
public interface ProfileRepository extends JpaRepository<Mdl_profile, Long> {
     @Query(value = "select p.* from profile p order by p.id desc limit 1 ", nativeQuery = true)
    public Mdl_profile findLastProfile();
}


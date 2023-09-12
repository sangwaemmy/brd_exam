package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_criteria_tender;
@Repository
public interface Criteria_tenderRepository extends JpaRepository<Mdl_criteria_tender, Long> {
}


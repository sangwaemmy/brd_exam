package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_criteria;
@Repository
public interface CriteriaRepository extends JpaRepository<Mdl_criteria, Long> {
}


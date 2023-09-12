package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_tender_subm;
@Repository
public interface Tender_submRepository extends JpaRepository<Mdl_tender_subm, Long> {
}


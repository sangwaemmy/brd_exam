package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_tender_crit_grp;
@Repository
public interface Tender_crit_grpRepository extends JpaRepository<Mdl_tender_crit_grp, Long> {
}


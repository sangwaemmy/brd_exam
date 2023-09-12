package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_tender_resp_att;
@Repository
public interface Tender_resp_attRepository extends JpaRepository<Mdl_tender_resp_att, Long> {
}


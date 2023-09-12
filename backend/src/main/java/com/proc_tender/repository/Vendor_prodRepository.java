package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_vendor_prod;
@Repository
public interface Vendor_prodRepository extends JpaRepository<Mdl_vendor_prod, Long> {
}


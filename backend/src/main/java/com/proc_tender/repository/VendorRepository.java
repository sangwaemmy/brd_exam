package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_vendor;
@Repository
public interface VendorRepository extends JpaRepository<Mdl_vendor, Long> {
}


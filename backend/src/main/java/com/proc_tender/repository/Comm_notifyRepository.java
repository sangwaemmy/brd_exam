package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_comm_notify;
@Repository
public interface Comm_notifyRepository extends JpaRepository<Mdl_comm_notify, Long> {
}


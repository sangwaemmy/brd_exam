package com.proc_tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proc_tender.models.Mdl_rating;
@Repository
public interface RatingRepository extends JpaRepository<Mdl_rating, Long> {
}


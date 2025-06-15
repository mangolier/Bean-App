package com.jb.auth.repository;

import com.jb.auth.model.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrderRecordRepository extends JpaRepository<OrderRecord, Long> {
    List<OrderRecord> findByCreatedAtBetween(Date from, Date to);
}

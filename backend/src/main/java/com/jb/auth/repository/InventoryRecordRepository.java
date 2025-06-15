package com.jb.auth.repository;

import com.jb.auth.model.InventoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface InventoryRecordRepository extends JpaRepository<InventoryRecord, Long> {
    List<InventoryRecord> findByCreatedAtBetween(Date from, Date to);
}

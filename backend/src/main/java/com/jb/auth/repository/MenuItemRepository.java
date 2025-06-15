package com.jb.auth.repository;

import com.jb.auth.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByFromDateLessThanEqualAndToDateGreaterThanEqual(Date currentDate, Date currentDate2);
}

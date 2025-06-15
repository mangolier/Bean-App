package com.jb.auth.service;

import com.jb.auth.model.InventoryRecord;
import com.jb.auth.model.MenuItem;
import com.jb.auth.model.OrderRecord;

import java.util.Date;
import java.util.List;

public interface AdminService {
    List<InventoryRecord> getInventoryRecords(Date from, Date to);
    void addInventoryRecord(InventoryRecord item);
    List<MenuItem> getMenuItems();
    void addMenuItem(MenuItem item);
    List<OrderRecord> getOrderRecords(Date from, Date to);
    void addOrderRecord(OrderRecord order);
}
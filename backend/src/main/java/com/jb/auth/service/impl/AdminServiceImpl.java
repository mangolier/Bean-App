package com.jb.auth.service.impl;

import com.jb.auth.model.InventoryRecord;
import com.jb.auth.model.MenuItem;
import com.jb.auth.model.OrderRecord;
import com.jb.auth.repository.InventoryRecordRepository;
import com.jb.auth.repository.MenuItemRepository;
import com.jb.auth.repository.OrderRecordRepository;
import com.jb.auth.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final InventoryRecordRepository inventoryRecordRepository;
    private final OrderRecordRepository orderRecordRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    public List<InventoryRecord> getInventoryRecords(Date from, Date to) {
        return inventoryRecordRepository.findByCreatedAtBetween(from, to);
    }

    @Override
    public void addInventoryRecord(InventoryRecord item) {
        inventoryRecordRepository.save(item);
    }

    @Override
    public List<MenuItem> getMenuItems() {
        return menuItemRepository.findByFromDateLessThanEqualAndToDateGreaterThanEqual(new Date(), new Date());
    }

    @Override
    public void addMenuItem(MenuItem item) {
        menuItemRepository.save(item);
    }

    @Override
    public List<OrderRecord> getOrderRecords(Date from, Date to) {
        return orderRecordRepository.findByCreatedAtBetween(from, to);
    }

    @Override
    public void addOrderRecord(OrderRecord order) {
        orderRecordRepository.save(order);
    }
}
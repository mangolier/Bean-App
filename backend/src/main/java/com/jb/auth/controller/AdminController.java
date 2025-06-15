package com.jb.auth.controller;

import com.jb.auth.model.InventoryRecord;
import com.jb.auth.model.MenuItem;
import com.jb.auth.model.OrderRecord;
import com.jb.auth.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryRecord>> getInventoryRecords(Date from, Date to) {
        return ResponseEntity.ok(adminService.getInventoryRecords(from, to));
    }

    @PostMapping("/inventory")
    public ResponseEntity<?> addInventoryRecord(@RequestBody InventoryRecord record) {
        adminService.addInventoryRecord(record);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/menu")
    public ResponseEntity<List<MenuItem>> getMenuItems() {
        return ResponseEntity.ok(adminService.getMenuItems());
    }

    @PostMapping("/menu")
    public ResponseEntity<?> addMenuItem(@RequestBody MenuItem item) {
        adminService.addMenuItem(item);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderRecord>> getOrderRecords(Date from, Date to) {
        return ResponseEntity.ok(adminService.getOrderRecords(from, to));
    }

    @PostMapping("/orders")
    public ResponseEntity<?> addOrderRecord(@RequestBody OrderRecord order) {
        adminService.addOrderRecord(order);
        return ResponseEntity.ok(null);
    }
}
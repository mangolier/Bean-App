package com.jb.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "InventoryRecords")
public class InventoryRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @OneToMany(mappedBy = "inventoryRecord", fetch = FetchType.LAZY)
    private List<InventoryItem> items = new ArrayList<>();

    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Column(name = "CreatedBy", nullable = false)
    private String createdBy;
}

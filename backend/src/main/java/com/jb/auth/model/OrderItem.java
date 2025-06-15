package com.jb.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "OrderItems")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "OrderRecordId")
    private OrderRecord orderRecord;

    @ManyToOne
    @JoinColumn(name = "MenuItemId")
    private MenuItem menuItem;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Column(name = "CreatedBy", nullable = false)
    private String createdBy;

}
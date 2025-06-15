package com.jb.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Price")
    private double price;

    @Column(name = "FromDate")
    private Date fromDate;

    @Column(name = "ToDate")
    private Date toDate;

    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Column(name = "CreatedBy", nullable = false)
    private String createdBy;
}

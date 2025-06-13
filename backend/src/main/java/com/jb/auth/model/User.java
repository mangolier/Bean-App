package com.jb.auth.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String providerId;

    @Column(nullable = false)
    private String provider;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String password;
}

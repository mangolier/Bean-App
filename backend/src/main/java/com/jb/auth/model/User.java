package com.jb.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "ProviderId", nullable = false)
    private String providerId;

    @Column(name = "Provider", nullable = false)
    private String provider;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "Role", nullable = false)
    private Role role = Role.USER;

    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Column(name = "CreatedBy", nullable = false)
    private String createdBy;
}

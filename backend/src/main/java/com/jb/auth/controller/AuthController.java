package com.jb.auth.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @GetMapping("/login-success")
    public String loginSuccess() {
        return "Login was successful!";
    }

    @PostMapping("/logout-success")
    public String logoutSuccess() {
        return "You have been logged out.";
    }
}
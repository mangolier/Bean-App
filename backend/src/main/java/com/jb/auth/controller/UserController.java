package com.jb.auth.controller;

import com.jb.auth.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    @GetMapping("/info")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }
}

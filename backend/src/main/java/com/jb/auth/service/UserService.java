package com.jb.auth.service;

import com.jb.auth.model.User;

public interface UserService {
    User getUserByEmail(String email);
}

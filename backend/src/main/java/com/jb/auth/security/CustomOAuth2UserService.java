package com.jb.auth.security;

import com.jb.auth.model.User;
import com.jb.auth.repository.UserRepository;
import com.jb.auth.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);
        String provider = request.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getName();
        String email = oAuth2User.getAttribute("email");

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setProvider(provider);
            newUser.setProviderId(providerId);
            newUser.setEmail(email);
            newUser.setCreatedAt(new Date());
            newUser.setCreatedBy(email);
            userRepository.save(newUser);
        }

        String jwt = jwtService.generateToken(email);
        HttpServletResponse servletResponse = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();

        if (servletResponse != null) {
            try {
                servletResponse.sendRedirect("http://localhost:3000/oauth2/redirect?token=" + jwt);
            } catch (IOException e) {
                throw new RuntimeException("Redirect failed", e);
            }
        }

        return oAuth2User;
    }
}

package com.incubyte.backend.controller;

import com.incubyte.backend.dto.AuthResponse;
import com.incubyte.backend.dto.LoginRequest;
import com.incubyte.backend.dto.RegisterRequest;
import com.incubyte.backend.entity.User;
import com.incubyte.backend.repository.UserRepository;
import com.incubyte.backend.security.JwtUtil;
import com.incubyte.backend.service.CustomUserDetailsService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final CustomUserDetailsService userDetailsService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
                CustomUserDetailsService userDetailsService
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ) {

        if(userRepository.findByName(request.getName()).isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Username already exists");
        }

        User user = new User();

        user.setName(request.getName());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(
        request.getRole() == null ? "USER" : request.getRole()
);

        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getName(),

                        request.getPassword()
                )
        );

        UserDetails userDetails =
        userDetailsService.loadUserByUsername(request.getName());

        String token = jwtUtil.generateToken(userDetails);
        String role = userDetails.getAuthorities()
            .stream()
            .findFirst()
            .get()
            .getAuthority();

        return ResponseEntity.ok(
                new AuthResponse(token, role)
        );
    }

}
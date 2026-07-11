package com.incubyte.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incubyte.backend.dto.RegisterRequest;
import com.incubyte.backend.repository.UserRepository;
import com.incubyte.backend.security.JwtFilter;
import com.incubyte.backend.security.JwtUtil;
import com.incubyte.backend.service.CustomUserDetailsService;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtUtil jwtUtil;

    // Required because JwtFilter is injected into SecurityConfig
    @MockBean
    private JwtFilter jwtFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void shouldRegisterNewUserSuccessfully() throws Exception {

        RegisterRequest request = new RegisterRequest();
        request.setName("atik");
        request.setPassword("123456");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
    @Test
    void shouldLoginSuccessfully() throws Exception {

        LoginRequest request = new LoginRequest();
        request.setName("atik");
        request.setPassword("123456");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
}
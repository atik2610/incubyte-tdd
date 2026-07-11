package com.incubyte.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@SpringBootTest
@AutoConfigureMockMvc
class VehicleControllerIntegrationTest {


    @Autowired
    private MockMvc mockMvc;


    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    private void registerUser() throws Exception {

        String registerRequest = """
        {
            "name":"abcd",
            "password":"admin123",
            "role":"ADMIN"
        }
        """;


        mockMvc.perform(
                post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerRequest)
        )
        .andDo(print())
        .andExpect(status().isOk());
    }



    private String loginAndGetToken() throws Exception {


        registerUser();


        String loginRequest = """
        {
            "name":"abcd",
            "password":"admin123"
        }
        """;


        MvcResult result = mockMvc.perform(
                post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequest)
        )
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn();



        String response =
                result.getResponse().getContentAsString();


        System.out.println("LOGIN RESPONSE = " + response);


        JsonNode json = objectMapper.readTree(response);


        return json.get("token").asText();
    }




    @Test
    void shouldCreateVehicleWithJwt() throws Exception {


        token = loginAndGetToken();


        String vehicleRequest = """
        {
          "make":"Toyota",
          "model":"Corolla",
          "category":"Sedan",
          "price":1200000,
          "quantity":5
        }
        """;


        mockMvc.perform(
                post("/api/vehicles")
                .header(
                    "Authorization",
                    "Bearer " + token
                )
                .contentType(MediaType.APPLICATION_JSON)
                .content(vehicleRequest)
        )
        .andDo(print())
        .andExpect(status().isCreated());
    }

}
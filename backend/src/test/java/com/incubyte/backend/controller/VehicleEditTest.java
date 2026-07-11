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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@SpringBootTest
@AutoConfigureMockMvc
class VehicleEditTest {


    @Autowired
    private MockMvc mockMvc;


    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    private String loginAndGetToken() throws Exception {
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
    void shouldUpdateVehicleWithJwt() throws Exception {

        token = loginAndGetToken();

        String createRequest = """
        {
        "make":"Toyota",
        "model":"Corolla",
        "category":"Sedan",
        "price":1200000,
        "quantity":5
        }
        """;

        // Create vehicle
        MvcResult createResult = mockMvc.perform(
                post("/api/vehicles")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createRequest)
        )
        .andDo(print())
        .andExpect(status().isCreated())
        .andReturn();

        // Get created vehicle ID
        String createResponse = createResult.getResponse().getContentAsString();

        JsonNode json = objectMapper.readTree(createResponse);

        Long vehicleId = json.get("id").asLong();

        String updateRequest = """
        {
        "make":"Honda",
        "model":"City",
        "category":"Sedan",
        "price":1500000,
        "quantity":10
        }
        """;

        // Update vehicle
        mockMvc.perform(
                put("/api/vehicles/{id}", vehicleId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateRequest)
        )
        .andDo(print())
        .andExpect(status().isOk());
    }
}
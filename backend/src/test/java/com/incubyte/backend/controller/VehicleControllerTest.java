package com.incubyte.backend.controller;

import com.incubyte.backend.dto.RegisterRequest;
import com.incubyte.backend.security.JwtFilter;
import com.incubyte.backend.security.JwtUtil;
import com.incubyte.backend.service.CustomUserDetailsService;
import com.incubyte.backend.service.VehicleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(VehicleController.class)
@AutoConfigureMockMvc(addFilters = false)
class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VehicleService vehicleService;

    @MockBean
    private JwtFilter jwtFilter;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void shouldGetVehiclesSuccessfully() throws Exception {

        mockMvc.perform(get("/api/vehicles")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
void shouldCreateVehicleSuccessfully() throws Exception {

    String request = """
        {
          "make":"Toyota",
          "model":"Corolla",
          "category":"Sedan",
          "price":1200000,
          "quantity":5
        }
        """;

    mockMvc.perform(post("/api/vehicles")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(request))
            .andExpect(status().isCreated());
}
    
}
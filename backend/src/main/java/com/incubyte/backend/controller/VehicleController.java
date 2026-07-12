package com.incubyte.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incubyte.backend.dto.VehicleRequest;
import com.incubyte.backend.entity.Vehicle;
import com.incubyte.backend.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController  {
    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }
    
    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody VehicleRequest request) {

        Vehicle vehicle = vehicleService.createVehicle(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(vehicle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id,@RequestBody VehicleRequest request) {

        Vehicle updatedVehicle = vehicleService.updateVehicle(id, request);

        return ResponseEntity.ok(updatedVehicle);
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<Vehicle> purchaseVehicle(@PathVariable Long id) {

        Vehicle vehicle = vehicleService.purchaseVehicle(id);

        return ResponseEntity.ok(vehicle);
    }
}

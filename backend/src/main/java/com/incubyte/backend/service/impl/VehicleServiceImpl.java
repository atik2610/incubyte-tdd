package com.incubyte.backend.service.impl;

import com.incubyte.backend.dto.VehicleRequest;
import com.incubyte.backend.entity.Vehicle;
import com.incubyte.backend.repository.VehicleRepository;
import com.incubyte.backend.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository repository;

    @Override
    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }
    
    @Override
    public Vehicle createVehicle(VehicleRequest request) {
        Vehicle vehicle = new Vehicle();
        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setCategory(request.getCategory());
        vehicle.setPrice(request.getPrice());
        vehicle.setQuantity(request.getQuantity());
        return repository.save(vehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Vehicle updateVehicle(Long id, VehicleRequest request) {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setCategory(request.getCategory());
        vehicle.setPrice(request.getPrice());
        vehicle.setQuantity(request.getQuantity());
        return repository.save(vehicle);
    }

    @Override
    public Vehicle purchaseVehicle(Long id) {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));

        if (vehicle.getQuantity() <= 0) {
            throw new RuntimeException("Vehicle is out of stock");
        }

        vehicle.setQuantity(vehicle.getQuantity() - 1);
        return repository.save(vehicle);
    }

    @Override
    public Vehicle restockVehicle(Long id) {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));

        vehicle.setQuantity(vehicle.getQuantity() + 1);
        return repository.save(vehicle);
    }
}
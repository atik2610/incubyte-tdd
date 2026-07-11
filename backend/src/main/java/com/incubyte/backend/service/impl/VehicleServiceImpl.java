package com.incubyte.backend.service.impl;

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
}
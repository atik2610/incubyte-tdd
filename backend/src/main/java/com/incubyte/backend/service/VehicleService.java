package com.incubyte.backend.service;
import com.incubyte.backend.dto.VehicleRequest;
import com.incubyte.backend.entity.Vehicle;
import java.util.List;

public interface VehicleService {

    List<Vehicle> getAllVehicles();
    Vehicle createVehicle(VehicleRequest request);
}

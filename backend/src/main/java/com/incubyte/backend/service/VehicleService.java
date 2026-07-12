package com.incubyte.backend.service;
import com.incubyte.backend.dto.VehicleRequest;
import com.incubyte.backend.entity.Vehicle;
import java.util.List;

public interface VehicleService {

    List<Vehicle> getAllVehicles();
    Vehicle createVehicle(VehicleRequest request);
    void deleteVehicle(Long id);
    Vehicle updateVehicle(Long id, VehicleRequest request);
    Vehicle purchaseVehicle(Long id);
}

package com.incubyte.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.incubyte.backend.entity.Vehicle;

import java.util.Optional;
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByMake(String make);

}
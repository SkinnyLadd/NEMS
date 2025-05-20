package com.car.backend.repositories;

import com.car.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByFirstNameContainingIgnoreCase(String firstName);
    List<User> findByLastNameContainingIgnoreCase(String lastName);
    Optional<User> findByEmail(String email);
    Optional<User> findByCms(Long Cms);
}
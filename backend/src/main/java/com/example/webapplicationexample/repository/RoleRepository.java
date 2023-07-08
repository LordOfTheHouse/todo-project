package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.enum_model.ERole;
import com.example.webapplicationexample.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

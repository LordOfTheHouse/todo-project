package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.enum_model.ERole;
import com.example.webapplicationexample.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Обращение к табличке roles
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

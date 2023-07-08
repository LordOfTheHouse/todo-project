package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Взаимодействие с сущностью покупателя
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findCustomerByEmail(String email);
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}

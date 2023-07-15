package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Regularity;
import com.example.webapplicationexample.repository.RegularityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Логика взаимодействия с репозиторием Regularity
 */
@Service
public class RegularityServiceImpl implements RegularityService {

    private final RegularityRepository regularityRepository;

    @Autowired
    public RegularityServiceImpl(RegularityRepository regularityRepository) {
        this.regularityRepository = regularityRepository;
    }

    @Override
    public List<Regularity> findAll() {
        return regularityRepository.findAll();
    }
}

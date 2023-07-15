package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Priority;
import com.example.webapplicationexample.repository.PriorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Логика взаимодействия с репозиторием Priority
 */
@Service
public class PriorityServiceImpl implements PriorityService{
    private final PriorityRepository priorityRepository;

    @Autowired
    public PriorityServiceImpl(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    @Override
    public List<Priority> findAll() {
        return priorityRepository.findAll();
    }
}

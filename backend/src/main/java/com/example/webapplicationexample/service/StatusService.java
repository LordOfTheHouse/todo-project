package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Status;

import java.util.List;

/**
 * Логика взаимодействия с репозиторием Status
 */
public interface StatusService {
    /**
     * Возвращает все возможные статусы задач
     */
    List<Status> findAll();
}

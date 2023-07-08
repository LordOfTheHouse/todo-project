package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.cropped.CroppedTask;
import com.example.webapplicationexample.repository.CategoryRepository;
import com.example.webapplicationexample.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Реализует логику работы с репозиторием Task
 */
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public long save(Task task) {
        return taskRepository.save(task).getId();
    }

    @Override
    public boolean update(Task task) {
        if (taskRepository.existsById(task.getId())) {
            taskRepository.save(task);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(long idTask) {
        if (!taskRepository.existsById(idTask)) {
            return false;
        }
        taskRepository.deleteById(idTask);
        return true;
    }

    @Override
    public List<CroppedTask> findAll(long userId) {
        return categoryRepository.findCategoryByUser_Id(userId)
                .stream()
                .flatMap(category ->
                        taskRepository.findByCategory_Id(category.getId()).stream().map(CroppedTask::new))
                .toList();
    }

    @Override
    public List<CroppedTask> findTaskByCategory(long categoryId) {
        return taskRepository.findByCategory_Id(categoryId).stream().map(CroppedTask::new).toList();
    }

    @Override
    public List<CroppedTask> isNotifyTasks(long userId) {
        return categoryRepository.findCategoryByUser_Id(userId)
                .stream()
                .flatMap(category ->
                        taskRepository.findByCategory_Id(category.getId())
                                .stream()
                                .filter(TaskServiceImpl::isNotify)
                                .map(CroppedTask::new))
                .toList();
    }

    /**
     * Проверяет требюуется ли уведсмлять о данной задаче
     * @param task - задача
     * @return истина если о задаче требуется уведомлять
     */
    private static boolean isNotify(Task task) {
        LocalDateTime nowTime = LocalDateTime.now();
        boolean isYear = task.getDateNotify().getYear() == nowTime.getYear();
        boolean isMonth = task.getDateNotify().getMonth() == nowTime.getMonth();
        boolean isDay  = task.getDateNotify().getDayOfMonth() == nowTime.getDayOfMonth();
        long diffTime = task.getDateNotify().getHour() * 60 + task.getDateNotify().getMinute()-(nowTime.getHour()* 60 + nowTime.getMinute());
        return isYear && isMonth && isDay && (diffTime <= 20) && (diffTime >= 0);
    }
}

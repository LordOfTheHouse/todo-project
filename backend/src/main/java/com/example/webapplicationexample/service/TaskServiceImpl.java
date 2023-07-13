package com.example.webapplicationexample.service;

import com.example.webapplicationexample.exception.UserNotFound;
import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.cropped.CroppedCategory;
import com.example.webapplicationexample.model.cropped.CroppedTask;
import com.example.webapplicationexample.model.enum_model.ERegularity;
import com.example.webapplicationexample.model.enum_model.EStatus;
import com.example.webapplicationexample.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Реализует логику работы с репозиторием Task
 */
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final CategoryService categoryService;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, CategoryService categoryService) {
        this.taskRepository = taskRepository;
        this.categoryService = categoryService;
    }

    @Override
    public long save(Task task) {
        if(categoryService.existByCategoryUser(task.getCategory().getId())) {
            return taskRepository.save(task).getId();
        }
        return -1;
    }

    @Override
    public boolean update(Task task) {
        if (taskRepository.existsById(task.getId())
                && categoryService.existByCategoryUser(task.getCategory().getId())) {
            taskRepository.save(task);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(long idTask) {
        Optional<Task> task = taskRepository.findById(idTask);
        if (task.isPresent() && categoryService.existByCategoryUser(task.get().getCategory().getId())) {
            taskRepository.deleteById(idTask);
            return true;
        }
        return false;
    }

    @Override
    public Task findById(long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if (task.isPresent() && categoryService.existByCategoryUser(task.get().getCategory().getId())) {
            return task.get();
        }
        throw new UserNotFound("Ошибка получения задачи пользователя");
    }

    @Override
    public List<CroppedTask> findAll() {
        return categoryService.findAll()
                .stream()
                .flatMap(category ->
                        taskRepository.findByCategory_Id(category.getId())
                                .stream()
                                .map(CroppedTask::new))
                .toList();
    }

    @Override
    public List<CroppedTask> findTaskByCategory(long categoryId) {
        if(categoryService.existByCategoryUser(categoryId)){
            return taskRepository.findByCategory_Id(categoryId)
                    .stream()
                    .map(CroppedTask::new)
                    .toList();
        }
        return List.of();
    }

    @Override
    public List<CroppedTask> isNotifyTasks() {
        return categoryService.findAll()
                .stream()
                .filter(category -> !(category.getName().equals("Архив")
                                        || category.getName().equals("Корзина")))
                .flatMap(category ->
                        taskRepository.findByCategory_Id(category.getId())
                                .stream()
                                .filter(this::isNotify)
                                .map(CroppedTask::new))
                .toList();
    }

    /**
     * Проверяет требюуется ли уведсмлять о данной задаче
     * @param task - задача
     * @return истина если о задаче требуется уведомлять
     */
    private boolean isNotify(Task task) {
        if(task.getDateNotify() == null){
            return false;
        }
        LocalDateTime nowTime = LocalDateTime.now();
        boolean isYear = task.getDateNotify().getYear() == nowTime.getYear();
        boolean isMonth = task.getDateNotify().getMonth() == nowTime.getMonth();
        boolean isDay  = task.getDateNotify().getDayOfMonth() == nowTime.getDayOfMonth();
        long diffTime = task.getDateNotify().getHour() * 60 + task.getDateNotify().getMinute()-(nowTime.getHour()* 60 + nowTime.getMinute());
        if(isYear && isMonth && isDay && diffTime < 0
                && !(task.getRegularity().getRegularity().equals(ERegularity.NONE)
                || task.getRegularity().getRegularity().equals(ERegularity.ONCE))){
            updateRegularityTask(task);
        }
        return isYear && isMonth && isDay && (diffTime <= 20) && (diffTime >= 0) && !(task.getStatus().getStatus() == EStatus.COMPLETED);
    }

    private void updateRegularityTask(Task task){
        switch (task.getRegularity().getRegularity()){
            case EVERY_OTHER_DAY -> {
                LocalDateTime everyOtherDayNotify = task.getDateNotify();
                everyOtherDayNotify = everyOtherDayNotify.plusDays(2);

                task.setDateNotify(everyOtherDayNotify);
            }
            case DAILY -> {
                LocalDateTime everyOtherDayNotify = task.getDateNotify();
                everyOtherDayNotify = everyOtherDayNotify.plusDays(1);
                task.setDateNotify(everyOtherDayNotify);
            }
            case MONTHLY -> {
                LocalDateTime everyOtherDayNotify = task.getDateNotify();
                everyOtherDayNotify = everyOtherDayNotify.plusMonths(1);
                task.setDateNotify(everyOtherDayNotify);
            }
            case WEEKLY -> {
                LocalDateTime everyOtherDayNotify = task.getDateNotify();
                everyOtherDayNotify = everyOtherDayNotify.plusDays(7);
                task.setDateNotify(everyOtherDayNotify);
            }
            case BIWEEKLY -> {
                LocalDateTime everyOtherDayNotify = task.getDateNotify();
                everyOtherDayNotify = everyOtherDayNotify.plusDays(14);
                task.setDateNotify(everyOtherDayNotify);
            }
            case QUARTERLY -> {
                LocalDateTime everyOtherDayNotify = task.getDateNotify();
                everyOtherDayNotify = everyOtherDayNotify.plusMonths(3);
                task.setDateNotify(everyOtherDayNotify);
            }
        }
        update(task);
    }

    @Override
    public List<CroppedTask> findTaskInArhive() {
        Optional<CroppedCategory> categoryArchive = categoryService.findAll().stream()
                .filter(category -> category.getName().equals("Архив"))
                .findFirst();

        return categoryArchive
                .map(croppedCategory
                        -> findTaskByCategory(croppedCategory.getId()))
                .orElse(List.of());
    }

    @Override
    public List<CroppedTask> findTaskInCart() {
        Optional<CroppedCategory> categoryArchive = categoryService.findAll().stream()
                .filter(category -> category.getName().equals("Корзина"))
                .findFirst();

        return categoryArchive
                .map(croppedCategory
                        -> findTaskByCategory(croppedCategory.getId()))
                .orElse(List.of());
    }

    @Override
    public List<CroppedTask> findTaskInNowDay() {
        return categoryService.findAll()
                .stream()
                .filter(category -> !(category.getName().equals("Архив")
                                        || category.getName().equals("Корзина")))
                .flatMap(category ->
                        taskRepository.findByCategory_Id(category.getId())
                                .stream()
                                .filter(TaskServiceImpl::isNow)
                                .map(CroppedTask::new))
                .toList();
    }

    private static boolean isNow(Task task) {
        if(task.getDateNotify() == null) {
            return false;
        }
        LocalDateTime nowTime = LocalDateTime.now();
        boolean isYear = task.getDateNotify().getYear() == nowTime.getYear();
        boolean isMonth = task.getDateNotify().getMonth() == nowTime.getMonth();
        boolean isDay = task.getDateNotify().getDayOfMonth() == nowTime.getDayOfMonth();
        return isYear && isMonth && isDay;
    }

}

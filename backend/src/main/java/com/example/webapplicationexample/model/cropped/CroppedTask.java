package com.example.webapplicationexample.model.cropped;

import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.enum_model.EPriority;
import com.example.webapplicationexample.model.enum_model.ERegularity;
import com.example.webapplicationexample.model.enum_model.EStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.lang.model.util.ElementScanner6;
import java.time.LocalDateTime;

@Data
public class CroppedTask {
    private long id;
    private String title;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateNotify;
    private EStatus status;
    private EPriority priority;
    private ERegularity regularity;
    private CroppedCategory croppedCategory;

    public CroppedTask(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.dateNotify = task.getDateNotify();
        this.status = task.getStatus().getStatus();
        this.priority = task.getPriority().getPriority();
        this.regularity = task.getRegularity().getRegularity();
        this.croppedCategory = new CroppedCategory(task.getCategory());
    }
}

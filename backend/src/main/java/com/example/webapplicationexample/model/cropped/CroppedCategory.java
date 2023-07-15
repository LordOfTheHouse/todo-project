package com.example.webapplicationexample.model.cropped;

import com.example.webapplicationexample.model.Category;
import lombok.Data;

@Data
public class CroppedCategory {
    private long id;
    private String name;
    private long userId;

    public CroppedCategory(Category category) {
        this.id = category.getId();
        this.name = category.getCategory();
        this.userId = category.getUser().getId();
    }
}

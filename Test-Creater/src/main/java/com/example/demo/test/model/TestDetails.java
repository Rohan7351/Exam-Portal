package com.example.demo.test.model;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

import com.example.demo.question.model.Question;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
public class TestDetails {
	
	private String title;
	
	private DifficultyLevel difficultyLevel;
	
	private int passingScore;
	
	private Set<Question> questions;
	
	private int duration;
	
	private LocalDateTime startTime;
	
	private LocalDateTime endTime;
	
	private Category category;
	
	private String description;

}

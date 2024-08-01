package com.example.demo.test.model;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

import com.example.demo.question.model.Question;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Test {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String title;
	
	@Enumerated(EnumType.STRING)
	private DifficultyLevel difficultyLevel;
	
	private int passingScore;
	
	@OneToMany
	private Set<Question> questions;
	
	private int duration;
	
	private LocalDateTime startTime;
	
	private LocalDateTime endTime;
	
	@Enumerated(EnumType.STRING)
	private Category category;
	
	@Column(length = 2500)
	private String description;

}

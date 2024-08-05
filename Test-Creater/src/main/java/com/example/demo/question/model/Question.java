package com.example.demo.question.model;

import java.util.Set;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Question {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String text;
	
	@Enumerated(EnumType.STRING)
	private Type type;
	
	@ElementCollection
	private Set<String> options;
	
	private String correctOption;
	
	private String correctAnswer;
	
	private int point;
	
	private String explanation;
	
	

}

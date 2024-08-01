package com.example.demo.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.question.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer>{

}

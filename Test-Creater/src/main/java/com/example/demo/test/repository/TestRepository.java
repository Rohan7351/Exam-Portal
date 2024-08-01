package com.example.demo.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.test.model.Test;

public interface TestRepository extends JpaRepository<Test, Integer>{

}

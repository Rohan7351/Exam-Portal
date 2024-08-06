package com.example.demo.result.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.result.model.Result;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {

	List<Result> findByTestId(int testId);

	List<Result> findByUserId(String userId);
	
	Result findByTestIdAndUserId(int testId,String userId);

}

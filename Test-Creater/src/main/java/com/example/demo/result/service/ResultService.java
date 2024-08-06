package com.example.demo.result.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.question.model.Question;
import com.example.demo.result.model.Result;
import com.example.demo.result.repository.ResultRepository;
import com.example.demo.test.model.Test;
import com.example.demo.test.model.TestDetails;
import com.example.demo.user.model.User;

@Service
public class ResultService {
    @Autowired
	private ResultRepository repository;

	public void insertResult(Result result) {
		// TODO Auto-generated method stub
		repository.save(result);
	}

	public List<Result> findResultByTestId(int testId) {
		// TODO Auto-generated method stub
		return repository.findByTestId(testId);
	}

	public List<Result> findResultByUserId(String userId) {
		// TODO Auto-generated method stub
		return repository.findByUserId(userId);
	}

	
	
	
}

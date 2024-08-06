package com.example.demo.result.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.result.model.Result;
import com.example.demo.result.service.ResultService;
import com.example.demo.test.model.TestDetails;
import com.example.demo.test.service.TestService;
import com.example.demo.user.model.User;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/result")
@RequiredArgsConstructor
public class ResultController {
	@Autowired
    private ResultService service;
	
	@PostMapping("/insert")
	public void insertResult(@RequestBody Result result) {
		service.insertResult(result);
	}
	
	@GetMapping("/get/{testId}")
	public List<Result> findResultByTestId(@PathVariable int testId) {
		  return service.findResultByTestId(testId);
	}
	
	@GetMapping("/get/userid/{userId}")
	public List<Result> findResultByUserId(@PathVariable String userId) {
		
		  return service.findResultByUserId(userId);
	}
}

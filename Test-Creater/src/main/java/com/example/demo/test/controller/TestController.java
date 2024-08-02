package com.example.demo.test.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.test.model.Test;
import com.example.demo.test.model.TestDetails;
import com.example.demo.test.service.TestService;
import com.example.demo.user.model.User;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
	
	private final TestService service;
	
	@PostMapping("/insert")
	void insertTest(@RequestAttribute User user,@RequestBody TestDetails details) {
		service.insertTest(details,user);
	}
	
	@GetMapping("get/all")
	List<Test> getAllTests(@RequestAttribute User user){
		user.getEmail();
		return service.getAllTest();
	}

}

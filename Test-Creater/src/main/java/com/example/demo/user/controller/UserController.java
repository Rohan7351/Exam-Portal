package com.example.demo.user.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.test.model.Test;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserRole;
import com.example.demo.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/create")
	void create(@RequestBody User user) {
		userService.insertUser(user);
	}
	
	@GetMapping("/get/{userName}")
	User getByUsername(@PathVariable String userName) {
		return userService.findByUserName(userName);
	}
	
	@GetMapping("/exist/{userName}")
	Boolean existByUserName(@PathVariable String userName) {
		return userService.existByUserName(userName);
	}
	
	@PutMapping("/update/user")
	void updateUser(@RequestAttribute User user,User updateUser) {
		userService.updateUser(user, updateUser);
	}
	
	@DeleteMapping("delete/{userName}")
	void deleteUser(@RequestAttribute User user,@PathVariable String userName) {
		if(user.getUserRole().equals(UserRole.ADMIN))userService.deleteUser(userName);
	}
	
	@PostMapping("/assign/{userName}")
	void assignTest(@PathVariable String userName,@RequestBody Test test) {
		userService.assignTest(userName, test);
	}
//	find by username
//	existbyusername
//	change user
//	delete
//	assign
	

}

package com.example.demo.jwtdemo;

import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.model.User;
import com.example.demo.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class AuthController {
	
	private final JwtUtil jwtUtil;
	private final UserService service;
	private final AuthManager authManager;
	
	@PostMapping("/login")
	public String login(@RequestBody HashMap<String, String> user) {
		authManager.authVerify(user.get("Username"), user.get("password"));
		return jwtUtil.generateToken(user.get("Username"));
	}
	
	@PostMapping("/register")
	public void createUser(@RequestBody User user) {
		service.insertUser(user);
	}
}

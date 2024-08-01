package com.example.demo.jwtdemo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.model.User;
import com.example.demo.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final JwtUtil jwtUtil;
	private final UserService service;
	private final AuthManager authManager;
	
	@PostMapping("/login")
	public String login(@RequestParam String Username,@RequestParam String password) {
		authManager.authVerify(Username, password);
		return jwtUtil.generateToken(Username);
	}
	
	@PostMapping("/register")
	public void createUser(@RequestBody User user) {
		service.insertUser(user);
	}
}

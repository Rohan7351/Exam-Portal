package com.example.demo.user.service;

import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.test.model.Test;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserRole;
import com.example.demo.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public void insertUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}
	
	public User findByUserName(String userName) {
		return userRepository.findByUserName(userName);
	}
	
	public Boolean existByUserName(String userName) {
		return userRepository.existsByUserName(userName);
	}
	
	public void updateUser(User user,User updateUser) {
		if(user.getUserRole().equals(UserRole.ADMIN)||user.getId()==updateUser.getId()){
			userRepository.save(updateUser);
		}
	}
	
	public void deleteUser(String userName) {
		userRepository.delete(findByUserName(userName));
	}
	
	public void assignTest(String userName,Test test) {
		User user=findByUserName(userName);
		Set<Test>tests= user.getTests();
		tests.add(test);
		user.setTests(tests);
		userRepository.save(user);
	}
}

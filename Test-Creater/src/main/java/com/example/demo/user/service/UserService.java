package com.example.demo.user.service;

import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.test.model.Test;
import com.example.demo.test.repository.TestRepository;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserRole;
import com.example.demo.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final TestRepository testRepository;

	public void insertUser(User user) {
		if (user.getUserRole() == null) {
			UserRole userRole = UserRole.USER;
			user.setUserRole(userRole);
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

	public User findByUserName(String userName) {
		return userRepository.findByUserName(userName);
	}

	public Boolean existByUserName(String userName) {
		return userRepository.existsByUserName(userName);
	}

	public void updateUser(User updateUser) {
//		if(user.getId()==updateUser.getId()){
		User existUser = userRepository.findById(updateUser.getId()).get();
		existUser.setName(updateUser.getName());
		existUser.setUserName(updateUser.getUserName());
		existUser.setEmail(updateUser.getEmail());
		existUser.setPhoneNumber(updateUser.getPhoneNumber());
		userRepository.save(existUser);
//		}
	}

	public void deleteUser(String userName) {
		userRepository.delete(findByUserName(userName));
	}

	public void assignTest(String userName, Test test) {
		User user = findByUserName(userName);
		Set<Test> tests = user.getTests();
		tests.add(new Test(test.getId()));
		user.setTests(tests);
		userRepository.save(user);
	}

	public List<User> getCreator() {
		return userRepository.findByUserRole(UserRole.CREATER);
	}

	public List<User> getUser() {
		return userRepository.findByUserRole(UserRole.USER);
	}

	public List<User> getAdmin() {
		return userRepository.findByUserRole(UserRole.ADMIN);
	}
}

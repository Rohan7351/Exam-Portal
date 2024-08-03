package com.example.demo.test.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.demo.mapper.ObjMapper;
import com.example.demo.question.model.Question;
import com.example.demo.question.repository.QuestionRepository;
import com.example.demo.test.model.Test;
import com.example.demo.test.model.TestDetails;
import com.example.demo.test.repository.TestRepository;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserRole;
import com.example.demo.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestService {
	
	private final TestRepository testRepository;
	private final QuestionRepository questionRepository;
	private final ObjMapper mapper;
	private final UserRepository userRepository;
	
	public void insertTest(TestDetails details,User user) {
		insertQuestion(details.getQuestions());
		Test test=mapper.testDetailsToTest(details);
		testRepository.save(test);
		Set<Test> tests=user.getTests();
		tests.add(test);
		user.setTests(tests);
		userRepository.save(user);
	}
	
	private void insertQuestion(Set<Question> questions) {
		for(Question q:questions) {
			questionRepository.save(q);
		}
	}
	
	public List<Test> getAllTest(User user) {
		if(user.getUserRole().equals(UserRole.ADMIN))return testRepository.findAll();
		return new ArrayList<>( userRepository.findByUserName(user.getUserName()).getTests());	}

}

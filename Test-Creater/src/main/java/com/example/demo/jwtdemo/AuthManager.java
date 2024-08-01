package com.example.demo.jwtdemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.user.repository.UserRepository;

@Configuration
public class AuthManager {
	
	@Autowired
	private UserRepository repository;
	
	void authVerify(String userName,String password) {
		if(!repository.existsByUserName(userName)||!passwordEncoder().matches(password, repository.findByUserName(userName).getPassword()))throw new RuntimeException("User Does not Exist !!");
	}
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}

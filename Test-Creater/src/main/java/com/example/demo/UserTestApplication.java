package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin("http://localhost:3000")
public class UserTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserTestApplication.class, args);
	}

}

package com.example.demo.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.user.model.User;

public interface UserRepository extends JpaRepository<User, String>{
	
	User findByUserName(String userName);
	
	Boolean existsByUserName(String userName);

}

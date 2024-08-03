package com.example.demo.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.user.model.User;
import com.example.demo.user.model.UserRole;

public interface UserRepository extends JpaRepository<User, String>{
	
	User findByUserName(String userName);
	
	Boolean existsByUserName(String userName);
	
	List<User> findByUserRole(UserRole userRole);

}

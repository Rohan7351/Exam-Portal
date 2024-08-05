package com.example.demo.user.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.user.model.User;
import com.example.demo.user.model.UserRole;

public interface UserRepository extends JpaRepository<User, String>{
	
	User findByUserName(String userName);
	
	@Query("SELECT u FROM User u JOIN u.tests t WHERE t.id = :testId")
	
    Set<User> findUsersByTestId(@Param("testId") int testId);
	
	Boolean existsByUserName(String userName);
	
	List<User> findByUserRole(UserRole userRole);

}

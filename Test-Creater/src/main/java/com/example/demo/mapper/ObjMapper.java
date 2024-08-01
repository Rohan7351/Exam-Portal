package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.test.model.Test;
import com.example.demo.test.model.TestDetails;

@Mapper(componentModel="spring")
public interface ObjMapper {
	
	Test testDetailsToTest(TestDetails testDetails);
	
	TestDetails testToTestDetails(Test test);

}

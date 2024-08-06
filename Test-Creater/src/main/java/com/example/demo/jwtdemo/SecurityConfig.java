package com.example.demo.jwtdemo;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	String[] exposedUrls=new String[] {
			"/login",
			"/register",
			"/send-otp",
			"/user/insert",
			"/user/assign/*",
			"/user/create",
			"/user/get/*",
			"/user/exist/*",
			"/user/update/user",
			"/test/delete/*",
			"/result/get/*",
			"/test/get/*",
			"result/get/userid/*"
			
	};
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		return http.csrf(csrf -> csrf
                .disable())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(exposedUrls)
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(corsFilter(), CorsFilter.class)
                .build();	
	}
	
//	 @Bean
//	    public CorsFilter corsFilter() {
//	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	        CorsConfiguration corsConfiguration = new CorsConfiguration();
//	        corsConfiguration.setAllowedOrigins(Collections.singletonList("*")); // or use specific origins
//	        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//	        corsConfiguration.setAllowedHeaders(Arrays.asList("*")); // or use specific headers
//	        corsConfiguration.setAllowCredentials(true);
//	        source.registerCorsConfiguration("/**", corsConfiguration);
//	        return new CorsFilter(source);
//	    }
	

}

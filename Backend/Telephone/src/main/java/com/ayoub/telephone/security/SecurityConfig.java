package com.ayoub.telephone.security;





import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    http.sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

	        .csrf(csrf -> csrf.disable())

	        .cors(cors -> cors.configurationSource(request -> {
	            CorsConfiguration corsConfig = new CorsConfiguration();
	            corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
	            corsConfig.setAllowedMethods(Collections.singletonList("*"));
	            corsConfig.setAllowedHeaders(Collections.singletonList("*"));
	            corsConfig.setExposedHeaders(Collections.singletonList("Authorization"));
	            return corsConfig;
	        }))

	        .authorizeHttpRequests(requests ->

	            // GET ALL
	            requests.requestMatchers(HttpMethod.GET, "/api/all").hasAnyAuthority("ADMIN", "USER")

	            // GET BY ID
	            .requestMatchers(HttpMethod.GET, "/api/getbyid/**").hasAnyAuthority("ADMIN", "USER")

	            // SEARCH
	            .requestMatchers(HttpMethod.GET, "/api/search/**").hasAnyAuthority("ADMIN", "USER")

	            // STATUT
	            .requestMatchers(HttpMethod.GET, "/api/telStats/**").hasAnyAuthority("ADMIN", "USER")

	            // ADD
	            .requestMatchers(HttpMethod.POST, "/api/addtel").hasAuthority("ADMIN")

	            // UPDATE
	            .requestMatchers(HttpMethod.PUT, "/api/updatetel").hasAuthority("ADMIN")

	            // DELETE
	            .requestMatchers(HttpMethod.DELETE, "/api/deltel/**").hasAuthority("ADMIN")

	            // باقي الطلبات
	            .anyRequest().authenticated()
	        )

	        .addFilterBefore(new JWTAuthorizationFilter(),
	                UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}
}
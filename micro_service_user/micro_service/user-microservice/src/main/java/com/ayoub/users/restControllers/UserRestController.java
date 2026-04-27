package com.ayoub.users.restControllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.ayoub.users.entities.User;
import com.ayoub.users.repos.UserRepository;
import com.ayoub.users.service.UserService;
import com.ayoub.users.service.exception.ErrorDetails;
import com.ayoub.users.service.exception.ExpiredTokenException;
import com.ayoub.users.service.exception.InvalidTokenException;
import com.ayoub.users.service.register.RegistrationRequest;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {

    private final UserRepository userRepository;
	@Autowired
	UserService userService;

    UserRestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	@GetMapping("all")
	public List<User> getAllUsers() {
		return userService.findAllUsers();
	}
	@PostMapping("/register")
	public User register(@RequestBody RegistrationRequest request) {
		return userService.registerUser(request);
	}
	@GetMapping("/verifyEmail/{token}")
	 public User verifyEmail(@PathVariable("token") String token){
	return userService.validateToken(token);
	 }
	


	
}

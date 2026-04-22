package com.ayoub.users.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.ayoub.users.entities.User;
import com.ayoub.users.repos.UserRepository;
import com.ayoub.users.service.UserService;


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
	
	
}

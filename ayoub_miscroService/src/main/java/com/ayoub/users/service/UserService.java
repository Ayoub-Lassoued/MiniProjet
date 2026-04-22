package com.ayoub.users.service;

import java.util.List;

import com.ayoub.users.entities.Role;
import com.ayoub.users.entities.User;


public interface UserService {
	User saveUser(User user);
	User findUserByUsername (String username);
	Role addRole(Role role);
	User addRoleToUser(String username, String rolename);
	List<User> findAllUsers();
	
}

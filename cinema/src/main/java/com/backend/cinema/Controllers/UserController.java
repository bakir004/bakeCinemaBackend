package com.backend.cinema.Controllers;

import com.backend.cinema.Models.User;
import com.backend.cinema.Repos.UserRepo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private UserRepo userRepo;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        this.userRepo.insert(user);
        return user;
    }
}

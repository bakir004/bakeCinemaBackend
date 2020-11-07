package com.backend.cinema.Repos;

import com.backend.cinema.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {

}

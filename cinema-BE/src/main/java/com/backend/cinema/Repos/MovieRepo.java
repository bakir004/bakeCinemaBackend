package com.backend.cinema.Repos;

import com.backend.cinema.Models.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepo extends MongoRepository<Movie, String> {

}

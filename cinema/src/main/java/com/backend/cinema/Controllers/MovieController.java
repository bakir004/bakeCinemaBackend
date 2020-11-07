package com.backend.cinema.Controllers;

import com.backend.cinema.Models.Movie;
import org.springframework.web.bind.annotation.*;
import com.backend.cinema.Repos.MovieRepo;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class MovieController {
    private MovieRepo movieRepo;

    public MovieController(MovieRepo movieRepo) {
        this.movieRepo = movieRepo;
    }

    @GetMapping("/movie")
    public List<Movie> getAllMovies() {
        List<Movie> movies = this.movieRepo.findAll();
        return movies;
    }

//    BEGIN CRUD

    @GetMapping("/movie/{id}")
    public Movie getMovie(@PathVariable("id") String id) {
        Movie movie = this.movieRepo.findById(id).orElse(new Movie());
        return movie;
    }

    @PostMapping("/movie")
    public Movie createMovie(@RequestBody Movie movie) {
        this.movieRepo.insert(movie);
        return movie;
    }

    @PutMapping("/movie")
    public Movie updateMovie(@RequestBody Movie movie) {
        this.movieRepo.save(movie);
        return movie;
    }

    @DeleteMapping("/movie/{id}")
    public Movie deleteMovie(@PathVariable("id") String id) {
        Movie movie = this.movieRepo.findById(id).orElse(new Movie());
        this.movieRepo.deleteById(id);
        return movie;
    }

//    END CRUD

}

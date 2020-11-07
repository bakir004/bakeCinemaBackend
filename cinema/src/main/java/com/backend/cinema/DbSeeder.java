package com.backend.cinema;

import com.backend.cinema.Models.Movie;
import com.backend.cinema.Repos.MovieRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DbSeeder implements CommandLineRunner {
    private MovieRepo movieRepo;

    public DbSeeder(MovieRepo movieRepo) {
        this.movieRepo = movieRepo;
    }

    @Override
    public void run(String... strings) throws Exception {
        Movie breakingBad = new Movie(
                "Breaking Bad",
                "2008–2013",
                "TV-14",
                "2008-01-20",
                49,
                new ArrayList<String>(Arrays.asList("Crime", "Drama", "Thriller")),
                "Vince Gilligan",
                "Vince Gilligan",
                new ArrayList<String>(Arrays.asList("Bryan Cranston", "Anna Gunn", "Aaron Paul", "Dean Norris", "Giancarlo Esposito")),
                "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's financial future.",
                "https://ae01.alicdn.com/kf/HTB1sPxAhcnI8KJjSsziq6z8QpXaG/Crime-Movie-Breaking-Bad-Film-Propaganda-Posters-Kraft-Poster-Decorative-Wall-Sticker-Canvas-Painting-Home-Decoration.jpg",
                "100",
                "9.5",
                "889,883",
                "series",
                new ArrayList<String>(Arrays.asList(
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgyMzI5NDc5Nl5BMl5BanBnXkFtZTgwMjM0MTI2MDE@._V1_SY1000_CR0,0,1498,1000_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2NDkwNDk5NV5BMl5BanBnXkFtZTgwNDM0MTI2MDE@._V1_SY1000_CR0,0,1495,1000_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM4NDcyNDMzMF5BMl5BanBnXkFtZTgwOTI0MTI2MDE@._V1_SY1000_CR0,0,1495,1000_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzMTczMjM3NjFeQTJeQWpwZ15BbWU4MDc1MTI1MzAx._V1_SY1000_CR0,0,1495,1000_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5MTE3MTgwMF5BMl5BanBnXkFtZTgwOTQxMjUzMDE@._V1_SX1500_CR0,0,1500,999_AL_.jpg"
                ))
        );
        Movie gameOfThrones = new Movie(
                "Game of Thrones",
                "2011-",
                "TV-MA",
                "2011-04-17",
                56,
                new ArrayList<String>(Arrays.asList("Adventure", "Drama", "Fantasy")),
                "David Benioff",
                "D.B. Weiss",
                new ArrayList<String>(Arrays.asList("Peter Dinklage", "Lena Headey", "Emilia Clarke", "Kit Harington")),
                "While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. Meanwhile a forgotten race, bent on destruction, plans to return after thousands of years in the North.",
                "https://i.etsystatic.com/15963200/r/il/d56484/1903615271/il_570xN.1903615271_2jfn.jpg",
                "80",
                "9.5",
                "1,000,000",
                "series",
                new ArrayList<String>(Arrays.asList(
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc1MGUyNzItNWRkOC00MjM1LWJjNjMtZTZlYWIxMGRmYzVlXkEyXkFqcGdeQXVyMzU3MDEyNjk@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BZjZkN2M5ODgtMjQ2OC00ZjAxLWE1MjMtZDE0OTNmNGM0NWEwXkEyXkFqcGdeQXVyNjUxNzgwNTE@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BMDk4Y2Y1MDAtNGVmMC00ZTlhLTlmMmQtYjcyN2VkNzUzZjg2XkEyXkFqcGdeQXVyNjUxNzgwNTE@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BNjZjNWIzMzQtZWZjYy00ZTkwLWJiMTYtOWRkZDBhNWJhY2JmXkEyXkFqcGdeQXVyMjk3NTUyOTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/M/MV5BNTMyMTRjZWEtM2UxMS00ZjU5LWIxMTYtZDA5YmJhZmRjYTc4XkEyXkFqcGdeQXVyMjk3NTUyOTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg"
                ))
        );

        this.movieRepo.deleteAll();

        List<Movie> movies = Arrays.asList(breakingBad, gameOfThrones);
        this.movieRepo.saveAll(movies);
    }
}

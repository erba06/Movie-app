package com.movie.react.repositories;

import com.movie.react.models.Movie;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie, String> {
    @Override
    void delete(Movie deleted);
}
package com.movie.react.controllers;

import com.movie.react.models.Movie;
import com.movie.react.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class MovieController {

    @Autowired
    MovieRepository movieRepository;

    @RequestMapping(method=RequestMethod.GET, value="/movies")
    public Iterable<Movie> movie() {
        return movieRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/movies")
    public Movie save(@RequestBody Movie movie) {
        movieRepository.save(movie);

        return movie;
    }

    @RequestMapping(method=RequestMethod.GET, value="/movies/{id}")
    public Optional<Movie> show(@PathVariable String id) {
        return movieRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/movies/{id}")
    public Movie update(@PathVariable String id, @RequestBody Movie movie) {
        Optional<Movie> optmovie = movieRepository.findById(id);
        Movie c = optmovie.get();
        if(movie.getTitle() != null)
            c.setTitle(movie.getTitle());
        if(movie.getType() != null)
            c.setType(movie.getType());
        if(movie.getDescription() != null)
            c.setDescription(movie.getDescription());
        if(movie.getImage() != null)
            c.setImage(movie.getImage());
        if(movie.getVote() != null)
            c.setVote(movie.getVote());
        movieRepository.save(c);
        return c;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/movies/{id}")
    public String delete(@PathVariable String id) {
        Optional<Movie> optmovie = movieRepository.findById(id);
        Movie movie = optmovie.get();
        movieRepository.delete(movie);

        return "";
    }
}
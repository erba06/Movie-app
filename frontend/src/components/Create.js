import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      type: '',
      vote: '',
      description: '',
      actors: '',
      director: '',
      posts: [],
    };
  }

  selectMovie(post) {
    console.log(post)
    this.setState({ title: post.title })
    this.setState({ type: post.date })
    this.setState({ director: post.vote })
    this.setState({ actors: post.image })
    this.setState({ description: post.description })
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, type, description, actors, director } = this.state;

    axios.post('/movies', { title, type, description, actors, director })
      .then((result) => {
        this.props.history.push("/")
      });
  }
  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=d2830f0b0600b930c426e3cd4fa4dc5a&language=en-US&`)
      .then(res => {
        console.log(res)
        const posts = res.data.results.map(obj => ({ title: obj.title, description: obj.overview, image: obj.poster_path, date: obj.release_date, vote: obj.vote_average }));
        this.setState({ posts });
      });
  }

  render() {
    const { title, type, description, actors, director } = this.state;

    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <header class="panel-title"><i class="fas fa-film" />
              <span>Add Movie</span>
              <Link to="/"><span>Movie List</span></Link>
              <i class="fas fa-video" />
            </header>
          </div>
          <div class="panel-body">
            <div className='title'><div className='title-text'>Add a movie</div></div>
            <div className='container-align'>
              <div className='select-movie'>
                <ul>
                  {this.state.posts.map(post =>

                    <div class="media">
                      <a href="#" class="pull-left">
                        <img src={`https://image.tmdb.org/t/p/w185${post.image}`} class="media-object" alt="Sample Image" />
                      </a>
                      <div class="media-body">
                        <h3 class="media-heading">{post.title}</h3>
                        <h6>{post.date}</h6>
                        {/*<h6>{post.description}</h6>*/}
                        <h6><span class="badge badge-success">{post.vote}</span></h6>
                        <Button onClick={() => this.selectMovie(post)} variant="danger" >Select</Button>
                      </div>
                    </div>

                  )}
                </ul>
              </div>



              <div className='form-container'>
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                  </div>
                  <div class="form-group">
                    <label for="type">Release date:</label>
                    <input type="text" class="form-control" name="type" value={type} onChange={this.onChange} placeholder="Type" />
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <input type="text" class="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" />
                  </div>
                  <div class="form-group">
                    <label for="actors">Picture path:</label>
                    <input type="text" class="form-control" name="actors" value={actors} onChange={this.onChange} placeholder="Actors" />
                  </div>
                  <div class="form-group">
                    <label for="director">Vote:</label>
                    <input type="text" class="form-control" name="director" value={director} onChange={this.onChange} placeholder="Director" />
                  </div>
                  <button type="submit" class="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
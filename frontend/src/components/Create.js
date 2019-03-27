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
      image: '',
      vote: '',
      posts: [],
      pageNumber: 0,
    };
  }

  selectMovie(post) {
    console.log(post)
    this.setState({ title: post.title })
    this.setState({ type: post.release_date })
    this.setState({ vote: post.vote_average })
    this.setState({ image: post.poster_path })
    this.setState({ description: post.overview })
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, type, description, image, vote } = this.state;

    axios.post('/movies', { title, type, description, image, vote })
      .then((result) => {
        this.props.history.push("/")
      });
  }
  showNextResults = () => {
    const nextPageNumber = this.state.pageNumber + 1
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=d2830f0b0600b930c426e3cd4fa4dc5a&language=en-US&page=${nextPageNumber}&_limit=15`)
      //.then(res => console.log(res))
      .then(nextPosts => {

        console.log(nextPosts)
        this.setState({
          posts: [...this.state.posts, ...nextPosts.data.results],
          pageNumber: nextPageNumber
        });

      });
  }


  componentDidMount() {
    this.showNextResults()
  }


  render() {
    console.log(this.state)
    const { title, type, description, image, vote } = this.state;

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
                        <img src={`https://image.tmdb.org/t/p/w185${post.poster_path}`} class="media-object" alt="Sample Image" />
                      </a>
                      <div class="media-body">
                        <h3 class="media-heading">{post.title}</h3>
                        <h6>{post.date}</h6>
                        <h6>{post.overview}</h6>
                        <h6><span class="badge badge-success">{post.vote_average}</span></h6>
                        <Button className='centered-button' onClick={() => this.selectMovie(post)} variant="danger" >Select</Button>
                      </div>
                    </div>

                  )}
                </ul>
                <Button className='centered-button' onClick={this.showNextResults}>Load more</Button>
              </div>

              <div className='form-container'>
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                  </div>
                  <div class="form-group">
                    <label for="type">Release date:</label>
                    <input type="text" class="form-control" name="type" value={type} onChange={this.onChange} placeholder="Release" />
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <input type="text" class="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" />
                  </div>
                  <div class="form-group">
                    <label for="image">Picture path:</label>
                    <input type="text" class="form-control" name="image" value={image} onChange={this.onChange} placeholder="Actors" />
                  </div>
                  <div class="form-group">
                    <label for="vote">Vote:</label>
                    <input type="text" class="form-control" name="vote" value={vote} onChange={this.onChange} placeholder="Vote" />
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
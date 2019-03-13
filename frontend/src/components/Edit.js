import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    axios.get('/movies/'+this.props.match.params.id)
      .then(res => {
        this.setState({ movie: res.data });
        console.log(this.state.movie);
      });
  }

  onChange = (e) => {
    const state = this.state.movie
    state[e.target.name] = e.target.value;
    this.setState({movie:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, type, description, actors, director } = this.state.movie;

    axios.put('/movies/'+this.props.match.params.id, { title, type, description, actors, director })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title"><i class="fas fa-film" />
              EDIT Movie
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.movie.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Movie List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.movie.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="title">Type:</label>
                <input type="text" class="form-control" name="type" value={this.state.movie.type} onChange={this.onChange} placeholder="Type" />
              </div>
              <div class="form-group">
                <label for="author">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.movie.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="published_date">Actors:</label>
                <input type="text" class="form-control" name="actors" value={this.state.movie.actors} onChange={this.onChange} placeholder="Actors" />
              </div>
              <div class="form-group">
                <label for="description">Director:</label>
                <input type="text" class="form-control" name="director" value={this.state.movie.director} onChange={this.onChange} placeholder="Director" />
              </div>
              <button type="submit" class="btn btn-success">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
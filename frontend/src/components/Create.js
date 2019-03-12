import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      type: '',
      description: '',
      actors: '',
      director: ''
    };
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

  render() {
    const { title, type, description, actors, director } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD MOVIE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true">
            </span> Movie List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="title">Type:</label>
                <input type="text" class="form-control" name="type" value={type} onChange={this.onChange} placeholder="Type" />
              </div>
              <div class="form-group">
                <label for="author">Description:</label>
                <input type="text" class="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="published_date">Actors:</label>
                <input type="text" class="form-control" name="actors" value={actors} onChange={this.onChange} placeholder="Actors" />
              </div>
              <div class="form-group">
                <label for="publisher">Director:</label>
                <input type="text" class="form-control" name="director" value={director} onChange={this.onChange} placeholder="Director" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
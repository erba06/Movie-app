import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './front.css'
let pic = require('../pic/le-parrain.jpg')

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    axios.get('/movies/' + this.props.match.params.id)
      .then(res => {
        this.setState({ movie: res.data });
        console.log(this.state.movie);
      });
  }

  delete(id) {
    console.log(this.props.match.params.id);
    axios.delete('/movies/' + id)
      .then((result) => {
        console.log(result)
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <header class="panel-title"><i class="fas fa-film" />
              <Link to="/"><span>Movie List</span></Link>
              <Link to="/create"><span>Add Movie</span></Link>
            </header>
          </div>

            <div class="panel-body">
              <h4><Link to="/">
                <i class="fas fa-video">Movie List</i></Link></h4>
              <dl>
                <img src={pic} />
                <dt>Title:</dt>
                <dd>{this.state.movie.title}</dd>
                <dt>Type:</dt>
                <dd>{this.state.movie.type}</dd>
                <dt>Description:</dt>
                <dd>{this.state.movie.description}</dd>
                <dt>Actors:</dt>
                <dd>{this.state.movie.actors}</dd>
                <dt>Director:</dt>
                <dd>{this.state.movie.director}</dd>
              </dl>
              <Link to={`/edit/${this.state.movie.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.movie.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
        );
      }
    }
    
export default Show;
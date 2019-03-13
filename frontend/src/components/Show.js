import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './front.css'
//let pic = require('../pic/le-parrain.jpg')

class Show extends Component {

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

  delete(id){
    console.log(this.props.match.params.id);
    axios.delete('/movies/'+id)
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
            <h3 class="panel-title"><i class="fas fa-film" />
              Movie Details
            </h3>
          </div>
          
          
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Movie List</Link></h4>
            <dl>
              {/*<img style={{width: '80px', height: '80px'}} src={pic}/>*/}
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
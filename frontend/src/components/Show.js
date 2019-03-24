import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import './front.css'
let pic = require('../pic/le-parrain.jpg')

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      posts: []
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
              <i class="fas fa-video" />
            </header>
          </div>

          <div class="panel-body">
            <div className='title'><div className='title-text'>Movie details</div></div>

            <div className='card-container'>
              <Card bg="info" text="white">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w185${this.state.movie.actors}`} className="media-object" alt="Sample Image" />
                <Card.Body>
                  <Card.Title>{this.state.movie.title}</Card.Title>
                  <Card.Subtitle><em>Date release:</em> {this.state.movie.type}</Card.Subtitle>
                  <Card.Text>
                    {this.state.movie.description}
                  </Card.Text>
                  <Card.Text><em>Vote:</em><span class="badge badge-success">{this.state.movie.director}</span></Card.Text>
                  <Link to={`/edit/${this.state.movie.id}`} class="btn btn-success">Edit</Link>&nbsp;
                  <Button variant="danger" onClick={this.delete.bind(this, this.state.movie.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
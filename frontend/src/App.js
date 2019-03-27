import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    console.log(props)
  }
  
  componentDidMount() {
    axios.get('/movies')
      .then(res => {
        this.setState({ movies: res.data });
        console.log(this.state.movies);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <header class="panel-title"><i class="fas fa-film" />
              <span>Movie List</span>
              <Link to="/create"><span>Add Movie</span></Link>
              <i class="fas fa-video" />
            </header>
          </div>
          <div class="panel-body">
            <div className='title'><div className='title-text'>My list of movies</div></div>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Release date</th>
                  <th>Vote</th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(c =>
                  <tr>
                    <td><Link to={`/show/${c.id}`}>{c.title}</Link></td>
                    <td>{c.type}</td>
                    <td>{c.vote}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
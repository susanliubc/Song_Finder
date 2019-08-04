import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

class Song extends Component {
  state = {
    track: {},
    songs: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        console.log('props: ', this.props);
        this.setState({ songs: res.data.message.body.lyrics });
        console.log('Songs res.data: ', res.data);
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        console.log('Track res.data: ', res.data);
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, songs } = this.state;
    console.log('Track: ', track);
    return track === undefined ||
      songs === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(songs).length === 0 ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <Link to='/' className='btn btn-small' style={{ margin: '10px auto 5px'}}>
          Go Back
        </Link>
        <div className='card'>
          <div className='card-content'>
            <h5 className='card-title'>
              {track.track_name} by <span>{track.artist_name}</span>
            </h5>
            <p className='card-paragraph'>{songs.lyrics_body}</p>
          </div>
        </div>
        <ul className='list-group'>
          <li className='list-group-item'>
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className='list-group-item'>
            <strong>Track Rating</strong>: {track.track_rating}
          </li>
          <li className='list-group-item'>
            <strong>Explicit Words</strong>:{' '}
            {track.explicit === 0 ? 'No' : 'Yes'}
          </li>
          <li className='list-group-item'>
            <strong>Release Date</strong>:{' '}
            <Moment format='MM/DD/YYYY'>{track.first_release_date}</Moment>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Song;

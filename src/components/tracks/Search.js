import React, { Component } from 'react';
import axios from 'axios';
import { SongConsumer } from '../../contact';

class Search extends Component {
  state = {
    trackTitle: ''
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (dispatch, event) => {
    event.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }$page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        console.log('Search res.data: ', res.data);
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: '' });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <SongConsumer>
        {value => {
          console.log('Search Value: ', value);
          const { dispatch } = value;
          return (
            <div className='card-content'>
              <h3 className='card-title center'>
                <i className='fas fa-music' />
                Search for a song
              </h3>
              <p className='lead center'>Get the lyrics for any song</p>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <div className='row'>
                  <div className='col s12'>
                    <input
                      type='text'
                      className='col s12'
                      placeholder='Song title...'
                      name='trackTitle'
                      value={this.state.trackTitle}
                      onChange={this.onChange}
                    />
                    <button
                      className='btn blue btn-block'
                      type='submit'
                      style={{ margin: '0 auto' }}
                    >
                      Get Track Songs
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </SongConsumer>
    );
  }
}

export default Search;

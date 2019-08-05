import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SongContext } from '../../contact';

const Search = () => {
  const { dispatch } = useContext(SongContext);
  const [trackTitle, setTrackTitle] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleChange = event => {
    setUserInput(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    setTrackTitle(userInput);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}$page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        console.log('Search res.data: ', res.data);
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='card-content'>
      <h3 className='card-title center'>
        <i className='fas fa-music' style={{ marginRight: '5px' }} />
        Search for a song
      </h3>
      <p className='lead center'>Get the lyrics for any song</p>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col s12'>
            <input
              type='text'
              className='col s12'
              placeholder='Song title...'
              name='trackTitle'
              value={userInput}
              onChange={handleChange}
              style={{ paddingLeft: '8px' }}
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
};

export default Search;

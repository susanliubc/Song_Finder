import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOP_TRACKS':
      return {
        ...state,
        trackList: action.payload,
        heading: 'Top 10 Tracks'
      };
    case 'SEARCH_TRACKS':
      return {
        ...state,
        trackList: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

let initState = {
  trackList: [],
  heading: ''
};

export const SongContext = React.createContext();

export const SongProvider = props => {
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        console.log('res.data: ', res.data);
        dispatch({
          type: 'TOP_TRACKS',
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SongContext.Provider>
  );
};

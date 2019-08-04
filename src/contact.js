import React, { Component } from 'react';
import axios from 'axios';

const SongContext = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        trackList: action.payload,
        heading: 'Search Results'
      }
    default:
      return state;
  }
}

export class SongProvider extends Component {
  state = {
    trackList: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        // console.log('res.data: ', res.data);
        this.setState({ trackList: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <SongContext.Provider value={this.state}>
        {this.props.children}
      </SongContext.Provider>
    );
  }
}

export const SongConsumer = SongContext.Consumer;

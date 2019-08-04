import React, { Component } from 'react';
import { SongConsumer } from '../../contact';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
  render() {
    return (
      <SongConsumer>
        {value => {
          console.log('Tracks Value: ', value);
          const { trackList, heading } = value;
          return trackList === undefined || trackList.length === 0 
            ? <Spinner />
            : (
              <React.Fragment>
                <h3 className="center">{heading}</h3>
                <div className="row">
                  {trackList.map(item => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </React.Fragment>)
        }}
      </SongConsumer>
    );
  }
}

export default Tracks;

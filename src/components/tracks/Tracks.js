import React, { useContext } from 'react';
import { SongContext } from '../../contact';
import Spinner from '../layout/Spinner';
import Track from './Track';

const Tracks = state => {
  const option = useContext(SongContext);
  const { trackList, heading } = option.state;
  return trackList === undefined || trackList.length === 0 ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <h3 className='center'>{heading}</h3>
      <div className='row'>
        {trackList.map(item => (
          <Track key={item.track.track_id} track={item.track} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Tracks;

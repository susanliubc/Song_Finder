import React from 'react';
import { Link } from 'react-router-dom';

const Track = props => {
  const { track } = props;
  return (
    <div className='col s12 m5 offset-m1 card'>
      <div className='card-content'>
        <h5 className='card-title'>{track.artist_name}</h5>
        <p className='card-paragraph'>
          <strong>
            <i className='fas fa-play' style={{ marginRight: '10px' }} />
            Track
          </strong>
          : {track.track_name}
          <br />
          <strong>
            <i
              className='fas fa-compact-disc'
              style={{ marginRight: '10px' }}
            />
            Album
          </strong>
          : {track.album_name}
        </p>
        <Link
          to={`songs/track/${track.track_id}`}
          className='btn grey lighten-1 btn-block'
          style={{ marginTop: '12px' }}
        >
          <i className='fas fa-chevron-right' />
          View Songs
        </Link>
      </div>
    </div>
  );
};

export default Track;

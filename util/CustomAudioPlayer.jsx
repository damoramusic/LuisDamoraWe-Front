// util/CustomAudioPlayer.jsx

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { AudioPlayer as OriginalAudioPlayer } from 'react-audio-play';

const CustomAudioPlayer = forwardRef((props, ref) => {
  const playerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      playerRef.current?.play();
    },
    pause: () => {
      playerRef.current?.pause();
    }
  }));

  return <OriginalAudioPlayer {...props} ref={playerRef} />;
});

export default CustomAudioPlayer;

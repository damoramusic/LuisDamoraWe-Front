// util/AudioPlayerWithRef.jsx

import React, { forwardRef } from 'react';
import { AudioPlayer as OriginalAudioPlayer } from 'react-audio-play';

const AudioPlayerWithRef = forwardRef((props, ref) => (
  <OriginalAudioPlayer {...props} ref={ref} />
));

export default AudioPlayerWithRef;


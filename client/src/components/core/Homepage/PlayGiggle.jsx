import React, { useRef, useState } from 'react';
import { GiMusicalNotes } from "react-icons/gi";

import babylaugh from "../../../assets/audio/baby-laughing-audio.mp3"

export const PlayGiggle = () => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className=' flex flex-row justify-center'>
            <button className='flex flex-row playgiggle  my-10 px-6 py-2 border-2  rounded-md border-red-500'
                onClick={togglePlayPause} >
                <GiMusicalNotes className='size-16 text-rose-500 ' />
                <span className='text-3xl py-3 px-8 font-bold text-rose-500'>{isPlaying ? 'Pause' : 'Play'} Giggle Ringtone</span>
                <GiMusicalNotes className='size-16 text-rose-500' />
            </button>

            <audio ref={audioRef}>
                <source src={babylaugh} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}

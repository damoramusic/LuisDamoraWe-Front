// // //src/components/Player.jsx

// // 'use client'
// // //IMPORTS REACT/NEXT:
// // import Image from "next/image";
// // // import { AudioPlayer } from 'react-audio-play';
// // //IMPORTS DEPENDENCIES:
// // import { motion } from 'framer-motion';
// // //IMPORTS CONTEXT:
// // import { useGlobalState } from "@/context/GlobalStateContext";
// // //IMPORTS HOOKS:
// // import { fadeIn } from '../../lib/variants';
// // import { preload } from "swr";
// // //IMPORTS COMPONENTS:
// // //IMPORT ENV:
// // const API_URL = process.env.NEXT_PUBLIC_API_URL;
// // const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// // //IMPORTS IMAGES:
// // //IMPORTS STYLES:

// // function Player() {
// //     const { handlePlay } = useGlobalState();
// //     const { heroPlayer } = useGlobalState();
// //     // console.log('heroPlayer', heroPlayer);

// //     return (
// //         <motion.div 
// //             className="bg-gradient-to-r from-tertiary/70 to-primary/10 backdrop-blur-[15px] h-[112px] flex items-center relative z-40"
// //             variants={fadeIn('up', 0.1)}
// //             initial='hidden'
// //             whileInView={'show'}
// //             viewport={{once: false, amount:0.1}}
// //         >   
// //         {heroPlayer.map((player, index) => (   
// //             <div key={index} className="container mx-auto flex flex-col justify-between items-center lg:flex-row ">
// //                 {/* Text & Avatar */}
// //                 <div className="hidden w-[300px] lg:flex items-center gap-x-4">
// //                     {/* Avatar image */}
// //                     <div className="relative w-16 h-16 rounded-[50%] overflow-hidden">
// //                         <Image
// //                             src={`${STRAPI_URL}${player.attributes.hero_player_image_author.data.attributes.url}`}
// //                             fill
// //                             // width={617}
// //                             // height={893}
// //                             priority
// //                             quality={100}
// //                             alt="" 
// //                         />    
// //                     </div>
// //                     {/* Text */}
// //                     <div className="leading-none ">
// //                         <div className="text-lg font-medium">
// //                             {player.attributes.hero_player_track_author} 
// //                         </div>
// //                         <div className="text-sm font-light">
// //                             {player.attributes.hero_player_track_title}
// //                         </div>
// //                     </div>
                
// //                 </div>
// //                 {/* Player */}
// //                 <div className="w-[70%] max-w-4xl ml-8">
// //                     {/* <AudioPlayer 
// //                         loop 
// //                         preload='none'
// //                         color='#fff'
// //                         volume={50}
// //                         volumePlacement="top"
// //                         src={`${STRAPI_URL}${player.attributes.hero_player_track_song.data.attributes.url}`}
// //                         style={{
// //                             background: 'transparent',
// //                             boxShadow:'none',
// //                             width:'100%'
// //                         }}
// //                         width={'100%'}
// //                         onPlay={(e) => handlePlay(e.target)}
// //                     /> */}
// //                 </div>
// //             </div>
// //         ))}
// //         </motion.div>
// //     )
// // }

// // export default Player

// 'use client';
// //IMPORTS REACT/NEXT:
// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// //IMPORTS DEPENDENCIES:
// import { motion } from 'framer-motion';
// import WaveSurfer from 'wavesurfer.js';
// import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
// //IMPORTS CONTEXT:
// import { useGlobalState } from "@/context/GlobalStateContext";
// //IMPORTS HOOKS:
// import { fadeIn } from '../../lib/variants';
// //IMPORT ENV:
// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// //IMPORTS STYLES:

// function Player() {
//     const { handlePlay } = useGlobalState();
//     const { heroPlayer, playingTrack, setPlayingTrack } = useGlobalState();
//     const waveSurferInstance = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isWaveSurferReady, setIsWaveSurferReady] = useState(false);

//     useEffect(() => {
//         const player = heroPlayer[0]?.attributes;

//         if (player) {
//             waveSurferInstance.current = WaveSurfer.create({
//                 container: '#waveform-player',
//                 waveColor: '#ddd',
//                 progressColor: '#339CE6',
//                 cursorColor: '#ff0000',
//                 barWidth: 3,
//                 height: 50,
//                 responsive: true,
//             });

//             waveSurferInstance.current.load(`${STRAPI_URL}${player.hero_player_track_song.data.attributes.url}`);

//             waveSurferInstance.current.on('ready', () => {
//                 setIsWaveSurferReady(true);
//             });

//             waveSurferInstance.current.on('play', () => {
//                 setIsPlaying(true);
//                 setPlayingTrack('player');
//             });

//             waveSurferInstance.current.on('pause', () => {
//                 setIsPlaying(false);
//             });
//         }

//         return () => {
//             if (waveSurferInstance.current && isWaveSurferReady) {
//                 waveSurferInstance.current.destroy();
//             }
//         };
//     }, [heroPlayer, isWaveSurferReady]);

//     useEffect(() => {
//         if (playingTrack !== 'player' && waveSurferInstance.current && waveSurferInstance.current.isPlaying()) {
//             waveSurferInstance.current.pause();
//         }
//     }, [playingTrack]);

//     const handlePlayPause = () => {
//         if (waveSurferInstance.current) {
//             waveSurferInstance.current.playPause();
//         }
//     };

//     return (
//         <motion.div 
//             className="bg-gradient-to-r from-tertiary/70 to-primary/10 backdrop-blur-[15px] h-[112px] flex items-center relative z-40"
//             variants={fadeIn('up', 0.1)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{once: false, amount:0.1}}
//         >   
//         {heroPlayer.map((player, index) => (
//             <div key={index} className="container mx-auto flex flex-col justify-between items-center lg:flex-row ">
//                 {/* Text & Avatar */}
//                 <div className="hidden w-[300px] lg:flex items-center gap-x-4">
//                     {/* Avatar image */}
//                     <div className="relative w-16 h-16 rounded-[50%] overflow-hidden">
//                         <Image
//                             src={`${STRAPI_URL}${player.attributes.hero_player_image_author.data.attributes.url}`}
//                             fill
//                             priority
//                             quality={100}
//                             alt="" 
//                         />    
//                     </div>
//                     {/* Text */}
//                     <div className="leading-none ">
//                         <div className="text-lg font-medium">
//                             {player.attributes.hero_player_track_author} 
//                         </div>
//                         <div className="text-sm font-light">
//                             {player.attributes.hero_player_track_title}
//                         </div>
//                     </div>
//                 </div>
//                 {/* Player */}
//                 <div className="w-[70%] max-w-4xl ml-8">
//                     <div id="waveform-player" className="relative w-full h-fit sm:h-full"></div>
//                     <button
//                         onClick={handlePlayPause}
//                         className="text-accent hover:text-accent px-2 py-2 mt-2"
//                     >
//                         {isPlaying ? <IoPauseSharp size={35} /> : <IoPlaySharp size={35} />}
//                     </button>
//                 </div>
//             </div>
//         ))}
//         </motion.div>
//     )
// }

// export default Player;


// 'use client';
// //IMPORTS REACT/NEXT:
// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// //IMPORTS DEPENDENCIES:
// import { motion } from 'framer-motion';
// import WaveSurfer from 'wavesurfer.js';
// import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
// //IMPORTS CONTEXT:
// import { useGlobalState } from "@/context/GlobalStateContext";
// //IMPORTS HOOKS:
// import { fadeIn } from '../../lib/variants';
// //IMPORT ENV:
// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// function Player() {
//     const { handlePlay, heroPlayer, playingTrack, setPlayingTrack } = useGlobalState();
//     const waveSurferInstance = useRef(null);
//     const waveformRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//         const player = heroPlayer[0]?.attributes;

//         if (player && waveformRef.current) {
//             waveSurferInstance.current = WaveSurfer.create({
//                 container: waveformRef.current,
//                 waveColor: '#ddd',
//                 progressColor: '#339CE6',
//                 cursorColor: '#ff0000',
//                 barWidth: 3,
//                 height: 50,
//                 responsive: true,
//             });

//             waveSurferInstance.current.isReady = false;

//             waveSurferInstance.current.load(`${STRAPI_URL}${player.hero_player_track_song.data.attributes.url}`);

//             waveSurferInstance.current.on('ready', () => {
//                 waveSurferInstance.current.isReady = true;
//             });

//             waveSurferInstance.current.on('play', () => {
//                 setIsPlaying(true);
//                 setPlayingTrack('player');
//             });

//             waveSurferInstance.current.on('pause', () => {
//                 setIsPlaying(false);
//             });
//         }

//         return () => {
//             if (waveSurferInstance.current && waveSurferInstance.current.isReady) {
//                 try {
//                     waveSurferInstance.current.destroy();
//                 } catch (error) {
//                     console.error('Error destroying WaveSurfer instance:', error);
//                 }
//                 waveSurferInstance.current = null;
//             }
//         };
//     }, [heroPlayer]);

//     useEffect(() => {
//         if (playingTrack !== 'player' && waveSurferInstance.current && waveSurferInstance.current.isPlaying()) {
//             waveSurferInstance.current.pause();
//         }
//     }, [playingTrack]);

//     const handlePlayPause = () => {
//         if (waveSurferInstance.current) {
//             waveSurferInstance.current.playPause();
//         }
//     };

//     return (
//         <motion.div 
//             className="bg-gradient-to-r from-tertiary/70 to-primary/10 backdrop-blur-[15px] h-[112px] flex items-center relative z-40"
//             variants={fadeIn('up', 0.1)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{once: false, amount:0.1}}
//         >   
//         {heroPlayer.map((player, index) => (
//             <div key={index} className="container mx-auto flex flex-col justify-between items-center lg:flex-row ">
//                 {/* Text & Avatar */}
//                 <div className="hidden w-[300px] lg:flex items-center gap-x-4">
//                     {/* Avatar image */}
//                     <div className="relative w-16 h-16 rounded-[50%] overflow-hidden">
//                         <Image
//                             src={`${STRAPI_URL}${player.attributes.hero_player_image_author.data.attributes.url}`}
//                             fill
//                             priority
//                             quality={100}
//                             alt="" 
//                         />    
//                     </div>
//                     {/* Text */}
//                     <div className="leading-none ">
//                         <div className="text-lg font-medium">
//                             {player.attributes.hero_player_track_author} 
//                         </div>
//                         <div className="text-sm font-light">
//                             {player.attributes.hero_player_track_title}
//                         </div>
//                     </div>
//                 </div>
//                 {/* Player */}
//                 <div className="w-[70%] max-w-4xl ml-8 flex flex-row items-center">
//                     <div className="w-full flex flex-row justify-center items-center">
//                         <div ref={waveformRef} className="relative w-full h-fit sm:h-full"></div>
//                     </div>
//                     <button
//                         onClick={handlePlayPause}
//                         className="text-accent hover:text-accent px-2 py-2 flex items-center"
//                     >
//                         {isPlaying ? <IoPauseSharp size={35} /> : <IoPlaySharp size={35} />}
//                     </button>
//                 </div>
//             </div>
//         ))}
//         </motion.div>
//     )
// }

// export default Player;

'use client';
//IMPORTS REACT/NEXT:
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
import WaveSurfer from 'wavesurfer.js';
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORT ENV:
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function Player() {
    const { handlePlay, heroPlayer, playingTrack, setPlayingTrack } = useGlobalState();
    const waveSurferInstance = useRef(null);
    const waveformRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const player = heroPlayer[0]?.attributes;

        if (player && waveformRef.current) {
            // Clear the container before initializing WaveSurfer
            waveformRef.current.innerHTML = '';

            waveSurferInstance.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#ddd',
                progressColor: '#339CE6',
                cursorColor: '#ff0000',
                barWidth: 3,
                height: 50,
                responsive: true,
            });

            waveSurferInstance.current.isReady = false;

            waveSurferInstance.current.load(`${STRAPI_URL}${player.hero_player_track_song.data.attributes.url}`);

            waveSurferInstance.current.on('ready', () => {
                waveSurferInstance.current.isReady = true;
            });

            waveSurferInstance.current.on('play', () => {
                setIsPlaying(true);
                setPlayingTrack('player');
            });

            waveSurferInstance.current.on('pause', () => {
                setIsPlaying(false);
            });
        }

        return () => {
            if (waveSurferInstance.current && waveSurferInstance.current.isReady) {
                try {
                    waveSurferInstance.current.destroy();
                } catch (error) {
                    console.error('Error destroying WaveSurfer instance:', error);
                }
                waveSurferInstance.current = null;
            }
        };
    }, [heroPlayer]);

    useEffect(() => {
        if (playingTrack !== 'player' && waveSurferInstance.current && waveSurferInstance.current.isPlaying()) {
            waveSurferInstance.current.pause();
        }
    }, [playingTrack]);

    const handlePlayPause = () => {
        if (waveSurferInstance.current) {
            waveSurferInstance.current.playPause();
        }
    };

    return (
        <motion.div 
            className="bg-gradient-to-r from-tertiary/70 to-primary/10 backdrop-blur-[15px] h-[150px] lg:h-[112px] flex items-center relative z-40"
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount:0.1}}
        >   
        {heroPlayer.map((player, index) => (
            <div key={index} className="container mx-auto flex flex-col justify-between lg:justify-center items-center lg:flex-row gap-y-2 lg:gap-y-0">
                {/* Text & Avatar */}
                <div className=" w-full flex flex-row justify-center  md:w-[300px] items-center gap-x-4">
                    {/* Avatar image */}
                    <div className="relative w-16 h-16 rounded-[50%] overflow-hidden">
                        <Image
                            src={`${STRAPI_URL}${player.attributes.hero_player_image_author.data.attributes.url}`}
                            fill
                            priority
                            quality={100}
                            alt="" 
                        />    
                    </div>
                    {/* Text */}
                    <div className="leading-none w-fit lg:w-[75%]">
                        <div className="text-lg font-medium text-accent">
                            {player.attributes.hero_player_track_author} 
                        </div>
                        <div className="text-sm font-light text-white/60">
                            {player.attributes.hero_player_track_title}
                        </div>
                    </div>
                </div>
                {/* Player */}
                <div className="w-full md:w-[70%] lg:w-full max-w-4xl ml-2 flex flex-row items-center">
                    <div className="w-full flex flex-row justify-center items-center">
                        <div ref={waveformRef} className="relative w-full h-fit sm:h-full"></div>
                    </div>
                    <button
                        onClick={handlePlayPause}
                        className="text-accent hover:text-accent px-2 py-2 flex items-center"
                    >
                        {isPlaying ? <IoPauseSharp size={35} /> : <IoPlaySharp size={35} />}
                    </button>
                </div>
            </div>
        ))}
        </motion.div>
    )
}

export default Player;

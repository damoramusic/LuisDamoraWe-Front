// 'use client';

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import Link from "next/link";
// import { useGlobalState } from "@/context/GlobalStateContext";
// import BeatportLogo from "../buttons/BeatportLogo";
// import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

// import WaveSurfer from 'wavesurfer.js';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// function AlbumSlider() {
//     const { songs } = useGlobalState();
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const waveSurferInstances = useRef({});
//     const [playingTrack, setPlayingTrack] = useState(null);
//     const [trackStates, setTrackStates] = useState({});

//     useEffect(() => {
//         return () => {
//             // Clean up WaveSurfer instances on component unmount
//             Object.values(waveSurferInstances.current).forEach(waveSurfer => {
//                 waveSurfer.destroy();
//             });
//         };
//     }, []);

//     useEffect(() => {
//         reversedSongs.forEach((song, songIndex) => {
//             const {
//                 song_audio,
//                 song_remix_audio_1,
//                 song_remix_audio_2,
//                 song_remix_audio_3,
//                 song_remix_audio_4,
//             } = song.attributes;

//             const tracks = [
//                 { src: song_audio?.data?.attributes?.url },
//                 { src: song_remix_audio_1?.data?.attributes?.url },
//                 { src: song_remix_audio_2?.data?.attributes?.url },
//                 { src: song_remix_audio_3?.data?.attributes?.url },
//                 { src: song_remix_audio_4?.data?.attributes?.url },
//             ].filter((track) => track.src);

//             tracks.forEach((track, trackIndex) => {
//                 const currentKey = `${songIndex}-${trackIndex}`;
//                 if (!waveSurferInstances.current[currentKey]) {
//                     waveSurferInstances.current[currentKey] = WaveSurfer.create({
//                         container: `#waveform-${currentKey}`,
//                         waveColor: '#ddd',
//                         progressColor: '#339CE6',
//                         cursorColor: '#ff0000',
//                         barWidth: 3,
//                         height: 50,
//                         responsive: true,
//                     });

//                     waveSurferInstances.current[currentKey].load(`${STRAPI_URL}${track.src}`);

//                     waveSurferInstances.current[currentKey].on('play', () => {
//                         setTrackStates((prev) => ({
//                             ...prev,
//                             [currentKey]: true,
//                         }));
//                     });

//                     waveSurferInstances.current[currentKey].on('pause', () => {
//                         setTrackStates((prev) => ({
//                             ...prev,
//                             [currentKey]: false,
//                         }));
//                     });
//                 }
//             });
//         });
//     }, [songs]);

//     const handlePlayPause = (songIndex, trackIndex) => {
//         const currentKey = `${songIndex}-${trackIndex}`;

//         // Pause all players except the one being played
//         Object.keys(waveSurferInstances.current).forEach((key) => {
//             if (key !== currentKey && waveSurferInstances.current[key]) {
//                 waveSurferInstances.current[key].pause();
//             }
//         });

//         const currentTrack = waveSurferInstances.current[currentKey];
//         if (currentTrack) {
//             currentTrack.playPause();
//             setPlayingTrack({ songIndex, trackIndex });
//         }
//     };

//     const reversedSongs = [...songs].reverse();

//     return (
//         <div className="mt-[50px]">
//             <div className="flex flex-col lg:justify-between">
//                 <div className="order-first lg:order-last w-full">
//                     <Swiper
//                         className="thumb-slider"
//                         onSwiper={setThumbsSwiper}
//                         modules={[FreeMode, Navigation, Thumbs]}
//                         spaceBetween={20}
//                         slidesPerView={5}
//                         freeMode={true}
//                         watchSlidesProgress={true}
//                         breakpoints={{
//                             0: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 10,
//                             },
//                             425: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 10,
//                             },
//                             640: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 20,
//                             },
//                             768: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 70,
//                             },
//                             1024: {
//                                 slidesPerView: 5,
//                                 spaceBetween: 10,
//                             },
//                             1440: {
//                                 slidesPerView: 6,
//                                 spaceBetween: 40,
//                             },
//                         }}
//                     >
//                         {reversedSongs.map((thumb, index) => {
//                             const imageUrl = thumb.attributes.song_image?.data?.attributes?.url;
//                             return (
//                                 <SwiperSlide
//                                     key={index}
//                                     className="relative group overflow-hidden border-2 border-transparent w-[254px] rounded-[10px]"
//                                 >
//                                     <div className="relative w-[195px] h-[195px] sm:w-[360px] sm:h-[360px] md:w-[240px] md:max-h-[240px] relative cursor-pointer">
//                                         <Image
//                                             className="object-contain group-hover:scale-105 transition-all duration-300"
//                                             src={`${STRAPI_URL}${imageUrl}`}
//                                             alt=""
//                                             fill
//                                             priority
//                                             quality={100}
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                 </div>

//                 <div className="order-last mt-4 lg:mt-0 lg:order-first w-full">
//                     <Swiper
//                         className="album-slider"
//                         effect={'coverflow'}
//                         speed={1000}
//                         spaceBetween={80}
//                         allowTouchMove={false}
//                         modules={[EffectCoverflow, FreeMode, Navigation, Thumbs]}
//                         coverflowEffect={{
//                             rotate: 50,
//                             stretch: 0,
//                             depth: 100,
//                             modifier: 1,
//                             slideShadows: true,
//                         }}
//                         thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                     >
//                         {reversedSongs.map((song, songIndex) => {
//                             const {
//                                 song_title,
//                                 song_author,
//                                 song_image,
//                                 song_audio,
//                                 song_remix_audio_1,
//                                 song_remix_audio_2,
//                                 song_remix_audio_3,
//                                 song_remix_audio_4,
//                                 song_link,
//                             } = song.attributes;
//                             const imageUrl = song_image?.data?.attributes?.url;

//                             const tracks = [
//                                 { author: song_author, name: song_title, src: song_audio?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_1, src: song_remix_audio_1?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_2, src: song_remix_audio_2?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_3, src: song_remix_audio_3?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_4, src: song_remix_audio_4?.data?.attributes?.url },
//                             ].filter((track) => track.src);

//                             return (
//                                 <SwiperSlide key={song.id} className="mb-12 SWL">
//                                     <div className="w-full h-fit bg-secondary/80 rounded-[10px] flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-2 gap-x-2">
//                                         <div className="hidden md:flex w-[300px] h-[300px] relative rounded-[10px] overflow-hidden cursor-pointer ">
//                                             <Image
//                                                 className="object-cover"
//                                                 src={`${STRAPI_URL}${imageUrl}`}
//                                                 alt={song_title}
//                                                 fill
//                                                 priority
//                                                 quality={100}
//                                                 style={{ width: '100%', height: '100%' }}
//                                             />
//                                         </div>
//                                         <div className="flex flex-1 w-full h-fit ">
//                                             <div className="flex flex-1 flex-col lg:px-0 gap-y-4">
//                                                 {tracks.map((track, trackIndex) => {
//                                                     const currentKey = `${songIndex}-${trackIndex}`;

//                                                     return (
//                                                         <div
//                                                             key={trackIndex}
//                                                             className="flex flex-col flex-wrap lg:flex-nowrap gap-y-4  w-full justify-start md:justify-center items-center mt-4 lg:mt-0 mb-0 "
//                                                         >
//                                                             <div className="w-full h-fit flex flex-col flex-wrap  justify-center items-start gap-x font-semibold lg:font-extrabold capitalize">
//                                                                 <div className="flex flex-row gap-x-2">
//                                                                     <div className="h-full max-h-[50px] flex justify-start items-center text-accent text-[12px] sm:text-[14px] md:text-[18px] lg:text-lg">
//                                                                         0{trackIndex + 1}.
//                                                                     </div>
//                                                                     <div className="min-w-fit text-[12px] sm:text-[14px] lg:text-[18px] l text-bold">
//                                                                         {track.author}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="text-[12px] sm:text-[14px] lg:text-[18px] min-w-[100px] lg:min-w-[250px] lg:w-full ml-[0px] lg:mr-2 text-white/60">
//                                                                     {track.name}
//                                                                 </div>
//                                                             </div>
//                                                             <div className="flex flex-row w-full gap-x-1 justify-start items-center">
                                                                
//                                                                 <div className="relative  w-[80%] h-fit sm:h-full ">
//                                                                     <div id={`waveform-${currentKey}`} />
                                                                    
//                                                                 </div>
//                                                                 <div className="flex flex-row w-fit items-center">
//                                                                     <button
//                                                                         onClick={() => handlePlayPause(songIndex, trackIndex)}
//                                                                         className="text-accent  hover:text-accent  px-2 py-2  items-center"
//                                                                     >
//                                                                         {trackStates[currentKey] ? <IoPauseSharp size={35} /> : <IoPlaySharp size={35} />}
//                                                                     </button>
//                                                                 </div>
//                                                                 <div className="h-fit sm:h-full flex items-start xl:items-center overflow-hidden">
//                                                                     <Link href={song_link || '#'} className="relative py-[5px] px-[10px] btn  btn-accent ml-0 sm:mt-[10px] xl:mt-0 items-center" target="_blank" >
//                                                                         <BeatportLogo width={70} height={25} />
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
                                                            
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AlbumSlider;


// 'use client';

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import Link from "next/link";
// import { useGlobalState } from "@/context/GlobalStateContext";
// import BeatportLogo from "../buttons/BeatportLogo";
// import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
// import WaveSurfer from 'wavesurfer.js';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// function AlbumSlider() {
//     const { songs, playingTrack, setPlayingTrack } = useGlobalState();
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const waveSurferInstances = useRef({});
//     const [trackStates, setTrackStates] = useState({});

//     useEffect(() => {
//         return () => {
//             // Clean up WaveSurfer instances on component unmount
//             Object.values(waveSurferInstances.current).forEach(waveSurfer => {
//                 waveSurfer.destroy();
//             });
//         };
//     }, []);

//     useEffect(() => {
//         reversedSongs.forEach((song, songIndex) => {
//             const {
//                 song_audio,
//                 song_remix_audio_1,
//                 song_remix_audio_2,
//                 song_remix_audio_3,
//                 song_remix_audio_4,
//             } = song.attributes;

//             const tracks = [
//                 { src: song_audio?.data?.attributes?.url },
//                 { src: song_remix_audio_1?.data?.attributes?.url },
//                 { src: song_remix_audio_2?.data?.attributes?.url },
//                 { src: song_remix_audio_3?.data?.attributes?.url },
//                 { src: song_remix_audio_4?.data?.attributes?.url },
//             ].filter((track) => track.src);

//             tracks.forEach((track, trackIndex) => {
//                 const currentKey = `${songIndex}-${trackIndex}`;
//                 if (!waveSurferInstances.current[currentKey]) {
//                     waveSurferInstances.current[currentKey] = WaveSurfer.create({
//                         container: `#waveform-${currentKey}`,
//                         waveColor: '#ddd',
//                         progressColor: '#339CE6',
//                         cursorColor: '#ff0000',
//                         barWidth: 3,
//                         height: 50,
//                         responsive: true,
//                     });

//                     waveSurferInstances.current[currentKey].load(`${STRAPI_URL}${track.src}`);

//                     waveSurferInstances.current[currentKey].on('play', () => {
//                         setTrackStates((prev) => ({
//                             ...prev,
//                             [currentKey]: true,
//                         }));
//                         setPlayingTrack(currentKey);
//                     });

//                     waveSurferInstances.current[currentKey].on('pause', () => {
//                         setTrackStates((prev) => ({
//                             ...prev,
//                             [currentKey]: false,
//                         }));
//                     });
//                 }
//             });
//         });
//     }, [songs]);

//     useEffect(() => {
//         if (playingTrack && waveSurferInstances.current[playingTrack] && !waveSurferInstances.current[playingTrack].isPlaying()) {
//             waveSurferInstances.current[playingTrack].playPause();
//         }
//         Object.keys(waveSurferInstances.current).forEach((key) => {
//             if (key !== playingTrack && waveSurferInstances.current[key] && waveSurferInstances.current[key].isPlaying()) {
//                 waveSurferInstances.current[key].pause();
//             }
//         });
//     }, [playingTrack]);

//     const handlePlayPause = (songIndex, trackIndex) => {
//         const currentKey = `${songIndex}-${trackIndex}`;

//         const currentTrack = waveSurferInstances.current[currentKey];
//         if (currentTrack) {
//             currentTrack.playPause();
//         }
//     };

//     const reversedSongs = [...songs].reverse();

//     return (
//         <div className="mt-[50px]">
//             <div className="flex flex-col lg:justify-between">
//                 <div className="order-first lg:order-last w-full">
//                     <Swiper
//                         className="thumb-slider"
//                         onSwiper={setThumbsSwiper}
//                         modules={[FreeMode, Navigation, Thumbs]}
//                         spaceBetween={20}
//                         slidesPerView={5}
//                         freeMode={true}
//                         watchSlidesProgress={true}
//                         breakpoints={{
//                             0: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 10,
//                             },
//                             425: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 10,
//                             },
//                             640: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 20,
//                             },
//                             768: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 70,
//                             },
//                             1024: {
//                                 slidesPerView: 5,
//                                 spaceBetween: 10,
//                             },
//                             1440: {
//                                 slidesPerView: 6,
//                                 spaceBetween: 40,
//                             },
//                         }}
//                     >
//                         {reversedSongs.map((thumb, index) => {
//                             const imageUrl = thumb.attributes.song_image?.data?.attributes?.url;
//                             return (
//                                 <SwiperSlide
//                                     key={index}
//                                     className="relative group overflow-hidden border-2 border-transparent w-[254px] rounded-[10px]"
//                                 >
//                                     <div className="relative w-[195px] h-[195px] sm:w-[360px] sm:h-[360px] md:w-[240px] md:max-h-[240px] relative cursor-pointer">
//                                         <Image
//                                             className="object-contain group-hover:scale-105 transition-all duration-300"
//                                             src={`${STRAPI_URL}${imageUrl}`}
//                                             alt=""
//                                             fill
//                                             priority
//                                             quality={100}
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                 </div>

//                 <div className="order-last mt-4 lg:mt-0 lg:order-first w-full">
//                     <Swiper
//                         className="album-slider"
//                         effect={'coverflow'}
//                         speed={1000}
//                         spaceBetween={80}
//                         allowTouchMove={false}
//                         modules={[EffectCoverflow, FreeMode, Navigation, Thumbs]}
//                         coverflowEffect={{
//                             rotate: 50,
//                             stretch: 0,
//                             depth: 100,
//                             modifier: 1,
//                             slideShadows: true,
//                         }}
//                         thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                     >
//                         {reversedSongs.map((song, songIndex) => {
//                             const {
//                                 song_title,
//                                 song_author,
//                                 song_image,
//                                 song_audio,
//                                 song_remix_audio_1,
//                                 song_remix_audio_2,
//                                 song_remix_audio_3,
//                                 song_remix_audio_4,
//                                 song_link,
//                             } = song.attributes;
//                             const imageUrl = song_image?.data?.attributes?.url;

//                             const tracks = [
//                                 { author: song_author, name: song_title, src: song_audio?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_1, src: song_remix_audio_1?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_2, src: song_remix_audio_2?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_3, src: song_remix_audio_3?.data?.attributes?.url },
//                                 { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_4, src: song_remix_audio_4?.data?.attributes?.url },
//                             ].filter((track) => track.src);

//                             return (
//                                 <SwiperSlide key={song.id} className="mb-12 SWL">
//                                     <div className="w-full h-fit bg-secondary/80 rounded-[10px] flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-4 gap-x-4">
//                                         <div className="hidden md:flex w-[300px] h-[300px] relative rounded-[10px] overflow-hidden cursor-pointer ">
//                                             <Image
//                                                 className="object-cover"
//                                                 src={`${STRAPI_URL}${imageUrl}`}
//                                                 alt={song_title}
//                                                 fill
//                                                 priority
//                                                 quality={100}
//                                                 style={{ width: '100%', height: '100%' }}
//                                             />
//                                         </div>
//                                         <div className="flex flex-1 w-full h-fit ">
//                                             <div className="flex flex-1 flex-col lg:px-0 gap-y-4">
//                                                 {tracks.map((track, trackIndex) => {
//                                                     const currentKey = `${songIndex}-${trackIndex}`;

//                                                     return (
//                                                         <div
//                                                             key={trackIndex}
//                                                             className="flex flex-col flex-wrap lg:flex-nowrap gap-y-4  w-full justify-start md:justify-center items-center mt-4 lg:mt-0 mb-0 "
//                                                         >
//                                                             <div className="w-full h-fit flex flex-col flex-wrap  justify-center items-start gap-x font-semibold lg:font-extrabold capitalize">
//                                                                 <div className="flex flex-row gap-x-2">
//                                                                     <div className="h-full max-h-[50px] flex justify-start items-center text-accent text-[12px] sm:text-[14px] md:text-[18px] lg:text-lg">
//                                                                         0{trackIndex + 1}.
//                                                                     </div>
//                                                                     <div className="min-w-fit text-[12px] sm:text-[14px] lg:text-[18px] l text-bold">
//                                                                         {track.author}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="text-[12px] sm:text-[14px] lg:text-[18px] min-w-[100px] lg:min-w-[250px] lg:w-full ml-[0px] lg:mr-2 text-white/60">
//                                                                     {track.name}
//                                                                 </div>
//                                                             </div>
//                                                             <div className="flex flex-row w-full gap-x-1 justify-start items-center">
                                                                
//                                                                 <div className="relative  w-[80%] h-fit sm:h-full ">
//                                                                     <div id={`waveform-${currentKey}`} />
                                                                    
//                                                                 </div>
//                                                                 <div className="flex flex-row w-fit items-center">
//                                                                     <button
//                                                                         onClick={() => handlePlayPause(songIndex, trackIndex)}
//                                                                         className="text-accent  hover:text-accent  px-2 py-2  items-center"
//                                                                     >
//                                                                         {trackStates[currentKey] ? <IoPauseSharp size={35} /> : <IoPlaySharp size={35} />}
//                                                                     </button>
//                                                                 </div>
//                                                                 <div className="h-fit sm:h-full flex items-start xl:items-center overflow-hidden">
//                                                                     <Link href={song_link || '#'} className="relative py-[5px] px-[10px] btn btn-accent hover:btn-accent ml-0 sm:mt-[10px] xl:mt-0 items-center" target="_blank" >
//                                                                         <BeatportLogo width={70} height={25} />
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
                                                            
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AlbumSlider;


'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalStateContext";
import BeatportLogo from "../buttons/BeatportLogo";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import WaveSurfer from 'wavesurfer.js';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function AlbumSlider() {
    const { songs, playingTrack, setPlayingTrack } = useGlobalState();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const waveSurferInstances = useRef({});
    const [trackStates, setTrackStates] = useState({});

    useEffect(() => {
        return () => {
            // Clean up WaveSurfer instances on component unmount
            Object.values(waveSurferInstances.current).forEach(waveSurfer => {
                if (waveSurfer && waveSurfer.isReady) {
                    waveSurfer.destroy();
                }
            });
        };
    }, []);

    useEffect(() => {
        reversedSongs.forEach((song, songIndex) => {
            const {
                song_audio,
                song_remix_audio_1,
                song_remix_audio_2,
                song_remix_audio_3,
                song_remix_audio_4,
            } = song.attributes;

            const tracks = [
                { src: song_audio?.data?.attributes?.url },
                { src: song_remix_audio_1?.data?.attributes?.url },
                { src: song_remix_audio_2?.data?.attributes?.url },
                { src: song_remix_audio_3?.data?.attributes?.url },
                { src: song_remix_audio_4?.data?.attributes?.url },
            ].filter((track) => track.src);

            tracks.forEach((track, trackIndex) => {
                const currentKey = `${songIndex}-${trackIndex}`;
                if (!waveSurferInstances.current[currentKey]) {
                    waveSurferInstances.current[currentKey] = WaveSurfer.create({
                        container: `#waveform-${currentKey}`,
                        waveColor: '#ddd',
                        progressColor: '#339CE6',
                        cursorColor: '#ff0000',
                        barWidth: 3,
                        height: 50,
                        responsive: true,
                    });

                    waveSurferInstances.current[currentKey].isReady = false;

                    waveSurferInstances.current[currentKey].load(`${STRAPI_URL}${track.src}`);

                    waveSurferInstances.current[currentKey].on('ready', () => {
                        waveSurferInstances.current[currentKey].isReady = true;
                    });

                    waveSurferInstances.current[currentKey].on('play', () => {
                        setTrackStates((prev) => ({
                            ...prev,
                            [currentKey]: true,
                        }));
                        setPlayingTrack(currentKey);
                    });

                    waveSurferInstances.current[currentKey].on('pause', () => {
                        setTrackStates((prev) => ({
                            ...prev,
                            [currentKey]: false,
                        }));
                    });
                }
            });
        });
    }, [songs]);

    useEffect(() => {
        if (playingTrack && waveSurferInstances.current[playingTrack] && !waveSurferInstances.current[playingTrack].isPlaying()) {
            waveSurferInstances.current[playingTrack].playPause();
        }
        Object.keys(waveSurferInstances.current).forEach((key) => {
            if (key !== playingTrack && waveSurferInstances.current[key] && waveSurferInstances.current[key].isPlaying()) {
                waveSurferInstances.current[key].pause();
            }
        });
    }, [playingTrack]);

    const handlePlayPause = (songIndex, trackIndex) => {
        const currentKey = `${songIndex}-${trackIndex}`;

        const currentTrack = waveSurferInstances.current[currentKey];
        if (currentTrack) {
            currentTrack.playPause();
        }
    };

    const reversedSongs = [...songs].reverse();

    return (
        <div className="mt-[50px]">
            <div className="flex flex-col lg:justify-between">
                <div className="order-first lg:order-last w-full">
                    <Swiper
                        className="thumb-slider"
                        onSwiper={setThumbsSwiper}
                        modules={[FreeMode, Navigation, Thumbs]}
                        spaceBetween={20}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            425: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 70,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            1440: {
                                slidesPerView: 6,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {reversedSongs.map((thumb, index) => {
                            const imageUrl = thumb.attributes.song_image?.data?.attributes?.url;
                            return (
                                <SwiperSlide
                                    key={index}
                                    className="relative group overflow-hidden border-2 border-transparent w-[254px] rounded-[10px]"
                                >
                                    <div className="relative w-[195px] h-[195px]   cursor-pointer">
                                        <Image
                                            className="object-contain group-hover:scale-105 transition-all duration-300"
                                            src={`${STRAPI_URL}${imageUrl}`}
                                            alt=""
                                            fill
                                            priority
                                            quality={100}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                <div className="order-last mt-4 lg:mt-0 lg:order-first w-full">
                    <Swiper
                        className="album-slider"
                        effect={'coverflow'}
                        speed={1000}
                        spaceBetween={80}
                        allowTouchMove={false}
                        modules={[EffectCoverflow, FreeMode, Navigation, Thumbs]}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    >
                        {reversedSongs.map((song, songIndex) => {
                            const {
                                song_title,
                                song_author,
                                song_image,
                                song_audio,
                                song_remix_audio_1,
                                song_remix_audio_2,
                                song_remix_audio_3,
                                song_remix_audio_4,
                                song_link,
                            } = song.attributes;
                            const imageUrl = song_image?.data?.attributes?.url;

                            const tracks = [
                                { author: song_author, name: song_title, src: song_audio?.data?.attributes?.url },
                                { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_1, src: song_remix_audio_1?.data?.attributes?.url },
                                { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_2, src: song_remix_audio_2?.data?.attributes?.url },
                                { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_3, src: song_remix_audio_3?.data?.attributes?.url },
                                { author: song.attributes.song_remix_author_1, name: song.attributes.song_remix_title_4, src: song_remix_audio_4?.data?.attributes?.url },
                            ].filter((track) => track.src);

                            return (
                                <SwiperSlide key={song.id} className="mb-12 SWL">
                                    <div className="w-full h-fit bg-secondary/80 rounded-[10px] flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-4 gap-x-4">
                                        <div className="hidden md:flex w-[300px] h-[300px] relative rounded-[10px] overflow-hidden cursor-pointer ">
                                            <Image
                                                className="object-cover"
                                                src={`${STRAPI_URL}${imageUrl}`}
                                                alt={song_title}
                                                fill
                                                priority
                                                quality={100}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                        <div className="flex flex-1 w-full h-fit ">
                                            <div className="flex flex-1 flex-col lg:px-0 gap-y-4">
                                                {tracks.map((track, trackIndex) => {
                                                    const currentKey = `${songIndex}-${trackIndex}`;

                                                    return (
                                                        <div
                                                            key={trackIndex}
                                                            className="flex flex-col flex-wrap lg:flex-nowrap gap-y-4  w-full justify-start md:justify-center items-center mt-4 lg:mt-0 mb-0 "
                                                        >
                                                            <div className="w-full h-fit flex flex-col flex-wrap  justify-center items-start gap-x font-semibold lg:font-extrabold capitalize">
                                                                <div className="flex flex-row gap-x-2">
                                                                    <div className="h-full max-h-[50px] flex justify-start items-center text-accent text-[12px] sm:text-[14px] md:text-[18px] lg:text-lg">
                                                                        0{trackIndex + 1}.
                                                                    </div>
                                                                    <div className="min-w-fit text-[12px] sm:text-[14px] lg:text-[18px] l text-bold">
                                                                        {track.author}
                                                                    </div>
                                                                </div>
                                                                <div className="text-[12px] sm:text-[14px] lg:text-[18px] min-w-[100px] lg:min-w-[250px] lg:w-full ml-[0px] lg:mr-2 text-white/60">
                                                                    {track.name}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row w-full gap-x-1 justify-start items-center">
                                                                
                                                                <div className="relative  w-[80%] h-fit sm:h-full ">
                                                                    <div id={`waveform-${currentKey}`} />
                                                                    
                                                                </div>
                                                                <div className="flex flex-row w-fit items-center">
                                                                    <button
                                                                        onClick={() => handlePlayPause(songIndex, trackIndex)}
                                                                        className="text-accent  hover:text-accent  px-2 py-2  items-center"
                                                                    >
                                                                        {trackStates[currentKey] ? <IoPauseSharp size={35} /> : <IoPlaySharp size={35} />}
                                                                    </button>
                                                                </div>
                                                                <div className="h-fit sm:h-full flex items-start xl:items-center overflow-hidden">
                                                                    <Link href={song_link || '#'} className="relative py-[5px] px-[10px] btn btn-accent hover:btn-accent ml-0 sm:mt-[10px] xl:mt-0 items-center" target="_blank" >
                                                                        <BeatportLogo width={70} height={25} />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default AlbumSlider;


'use client';

import React, { createContext, useContext, useState } from "react";

// Crear contexto
const GlobalStateContext = createContext();

// Hook para usar el contexto
export const useGlobalState = () => useContext(GlobalStateContext);

// Proveedor de contexto
const GlobalStateContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenNav, setIsOpenNav] = useState(false);
    
    // STRAPI DATA:
    const [currentAudio, setCurrentAudio] = useState(null);
    const [playingTrack, setPlayingTrack] = useState(null);
    const [biography, setBiography] = useState([]);
    const [heroPlayer, setHeroPlayer] = useState([]);
    const [heroSection, setHeroSection] = useState([]);
    const [heroSlider, setHeroSlider] = useState([]);
    const [eventsSection, setEventsSection] = useState([]);
    const [events, setEvents] = useState([]);
    const [socials, setSocials] = useState([]);
    const [postSection, setPostSection] = useState([]);
    const [posts, setPosts] = useState([]);
    const [singlePosts, setSinglePosts] = useState([]);
    const [newsletter, setNewsletter] = useState([]);
    const [discographySection, setDiscographySection] = useState([]);
    const [songs, setSongs] = useState([]);

    const handlePlay = (audioElement) => {
        if (currentAudio && currentAudio !== audioElement) {
          currentAudio.pause();
        }
        setCurrentAudio(audioElement);
      };

    return (
        <GlobalStateContext.Provider
            value={{
                handlePlay,
                currentAudio, setCurrentAudio,
                playingTrack, setPlayingTrack,
                isLoading, setIsLoading,
                isOpenNav, setIsOpenNav,
                posts, setPosts,
                postSection, setPostSection,
                singlePosts, setSinglePosts,
                eventsSection, setEventsSection,
                events, setEvents,
                biography, setBiography,
                heroPlayer, setHeroPlayer,
                heroSection, setHeroSection,
                heroSlider, setHeroSlider,
                newsletter, setNewsletter,
                socials, setSocials,
                discographySection, setDiscographySection,
                songs, setSongs,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
}

export default GlobalStateContextProvider;

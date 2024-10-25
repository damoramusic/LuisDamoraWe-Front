// // // hooks/useLoadData.js

// import { useEffect, useState } from 'react';
// import { useGlobalState } from '@/context/GlobalStateContext';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const useLoadData = () => {
//   const {
//     setBiography, setHeroPlayer, setHeroSection, setHeroSlider, setSocials, setEvents,setEventsSection, setPostSection, setPosts, setNewsletter, setDiscographySection, setSongs
//   } = useGlobalState();
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const endpoints = [
//         { url: `${API_URL}/biography?populate=*`, setter: setBiography },
//         { url: `${API_URL}/hero-players?populate=*`, setter: setHeroPlayer },
//         { url: `${API_URL}/hero-sections?populate=*`, setter: setHeroSection },
//         { url: `${API_URL}/hero-sliders?populate=*`, setter: setHeroSlider },
//         { url: `${API_URL}/rrss-socials?populate=*`, setter: setSocials },
//         { url: `${API_URL}/events-sections?populate=*`, setter: setEventsSection },
//         { url: `${API_URL}/events?populate=*`, setter: setEvents },
//         { url: `${API_URL}/post-sections?populate=*`, setter: setPostSection },
//         { url: `${API_URL}/posts?populate=*`, setter: setPosts },
//         { url: `${API_URL}/newsletter-sections?populate=*`, setter: setNewsletter },
//         { url: `${API_URL}/discography-sections?populate=*`, setter: setDiscographySection },
//         { url: `${API_URL}/songs?populate=*`, setter: setSongs },
//       ];

//       try {
//         for (const endpoint of endpoints) {
//           const response = await fetch(endpoint.url);
//           if (!response.ok) {
//             throw new Error(`Failed to fetch data from ${endpoint.url}`);
//           }
//           const data = await response.json();
//           endpoint.setter(data.data);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [
//     setBiography, setHeroPlayer, setHeroSection, setHeroSlider, setSocials, setEvents, setEventsSection, setPostSection, setPosts, setNewsletter, setDiscographySection, setSongs
//   ]);

//   return { loading, error };
// };
import { useEffect, useState } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useLoadData = () => {
  const {
    setIsLoading, // Importar el setIsLoading
    setBiography, setHeroPlayer, setHeroSection, setHeroSlider, setSocials, setEvents, setEventsSection, setPostSection, setPosts, setNewsletter, setDiscographySection, setSongs
  } = useGlobalState();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Comienza la carga
      const endpoints = [
        { url: `${API_URL}/biography?populate=*`, setter: setBiography },
        { url: `${API_URL}/hero-players?populate=*`, setter: setHeroPlayer },
        { url: `${API_URL}/hero-sections?populate=*`, setter: setHeroSection },
        { url: `${API_URL}/hero-sliders?populate=*`, setter: setHeroSlider },
        { url: `${API_URL}/rrss-socials?populate=*`, setter: setSocials },
        { url: `${API_URL}/events-sections?populate=*`, setter: setEventsSection },
        { url: `${API_URL}/events?populate=*`, setter: setEvents },
        { url: `${API_URL}/post-sections?populate=*`, setter: setPostSection },
        { url: `${API_URL}/posts?populate=*`, setter: setPosts },
        { url: `${API_URL}/newsletter-sections?populate=*`, setter: setNewsletter },
        { url: `${API_URL}/discography-sections?populate=*`, setter: setDiscographySection },
        { url: `${API_URL}/songs?populate=*`, setter: setSongs },
      ];

      try {
        for (const endpoint of endpoints) {
          const response = await fetch(endpoint.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint.url}`);
          }
          const data = await response.json();
          endpoint.setter(data.data);
        }
        setLoading(false);
        setIsLoading(false); // Finaliza la carga
      } catch (error) {
        setError(error);
        setLoading(false);
        setIsLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchData();
  }, [
    setIsLoading, // Añadir setIsLoading a las dependencias
    setBiography, setHeroPlayer, setHeroSection, setHeroSlider, setSocials, setEvents, setEventsSection, setPostSection, setPosts, setNewsletter, setDiscographySection, setSongs
  ]);

  return { loading, error };
};

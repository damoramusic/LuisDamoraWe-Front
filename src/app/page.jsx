// //src/app/page.jsx

// 'use client'

// //IMPORTS REACT/NEXT:
// import Image from "next/image";
// //IMPORTS DEPENDENCIES:
// //IMPORTS CONTEXT:
// import { useGlobalState } from "@/context/GlobalStateContext";
// //IMPORTS HOOKS:
// import useFetch from '../../hooks/useFetch';
// import { useLoadData } from '../../hooks/useLoadData';
// //IMPORTS COMPONENTS:
// import Events from "@/components/events/Events";
// import Hero from "@/components/hero/Hero";
// import Player from "@/components/Player";
// import Discography from "@/components/discography/Discography";
// import Blog from "@/components/blog/Blog";
// import Newsletter from "@/components/Newsletter";
// import Loader from "@/components/Loader";

// //IMPORTS IMAGES:
// //IMPORTS STYLES:

// export default function Home() {
    
//     const { isLoading, setIsLoading } = useGlobalState();
//     const { loading, error } = useLoadData();

//     useEffect(() => {
//         if (!loading && Array.isArray(data) && data.length > 0) {
//           setIsLoading(false);
//         }
//     }, [loading, data, setIsLoading]);
    
//     // useLoadData();
//     // setTimeout(() => {
//     //     setIsLoading(false);
//     // }, 3000);

//     return (
//         <main>{isLoading && <Loader />}
//             <Hero />
//             <Player />
//             <Discography/>
//             <Events />
//             <Blog />
//             <Newsletter />
//             {/* <div className="h-[4000px]"></div> */}
//         </main>
//     );
// }
// src/app/page.jsx

'use client'

// IMPORTS REACT/NEXT:
import { useEffect } from 'react';
// IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
// IMPORTS HOOKS:
import { useLoadData } from '../../hooks/useLoadData';
// IMPORTS COMPONENTS:
import Events from "@/components/events/Events";
import Hero from "@/components/hero/Hero";
import Player from "@/components/Player";
import Discography from "@/components/discography/Discography";
import Blog from "@/components/blog/Blog";
import Newsletter from "@/components/Newsletter";
import Loader from "@/components/Loader";

// IMPORTS STYLES:

export default function Home() {
  const { isLoading, setIsLoading } = useGlobalState();
  const { loading, error } = useLoadData(); // Aquí se llama a useLoadData

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading, setIsLoading]);

  if (error) return <div>Failed to load data: {error.message}</div>;

  return (
    <main>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Hero />
          <Player />
          <Discography />
          <Events />
          <Blog />
          <Newsletter />
        </>
      )}
    </main>
  );
}

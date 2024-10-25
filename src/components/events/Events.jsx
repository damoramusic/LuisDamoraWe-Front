'use client'
// export default Events;
'use client'
//IMPORTS REACT/NEXT:
import { useEffect } from "react";
//IMPORTS DEPENDENCIES:
import useSWR from "swr";
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS COMPONENTS:
import SectionHeader from "../SectionHeader";
import EventsBox from "./EventBox";
//IMPORTS STYLES

// const fetcher = (url) => fetch(url).then((res) => res.json());

const Events = () => {
    const { eventsSection } = useGlobalState();
    const { events } = useGlobalState();
    // console.log('eventsSection desde events', eventsSection)

    return (
        <section id="events" className="section mt-[50px]">
            {eventsSection.map((section, index) => (
                <div key={index} className="container mx-auto">
                    <SectionHeader 
                        pretitle={section.attributes.events_section_sub_title} 
                        title={section.attributes.events_section_title}
                    />
                    {/* Events box */}
                    {events.length === 0 ? (
                        <div className="w-full h-[250px] sm:h-[350px] md:h-[600px] flex justify-center items-center bg-events bg-no-repeat bg-center bg-cover">
                            <h1 className="text-[20px] md:text-[40px] lg:text-[50px] text-white">LIST COMING SOON!!!!</h1>
                        </div>
                    ) : (
                        <EventsBox />
                    )}
                </div>
            ))}
        </section>
    );
};

export default Events;

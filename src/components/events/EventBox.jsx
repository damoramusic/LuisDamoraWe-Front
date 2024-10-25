//src/components/events/EventBox.jsx
'use client'
//IMPORTS REACT/NEXT:
import Image from "next/image";
import Link from "next/link";
//IMPORTS DEPENDENCIES:
import {motion} from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../../lib/variants';
//IMPORTS COMPONENTS:
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS IMAGES:
import {RiMapPin2Fill} from 'react-icons/ri';
//IMPORTS STYLES:




const EventBox = () => {
    const { events, setEvents } = useGlobalState();
    const { eventsSection, setEventsSection } = useGlobalState();
    //console.log('EventBox', events)


    return (
        <motion.div 
            className="relative bg-secondary/60 rounded-[10px] p-4 xl:p:12"
            variants={fadeIn('up', 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount:0.3}}
        >
            <div className="flex flex-col xl:flex-row justify-between h-[620px] xl:h-full">
                {/* Image */}

                {
                    eventsSection.map((section, index) => (
                        <div key={index} className="hidden xl:flex w-[400px]">
                        
                            <Image 
                                src={`${STRAPI_URL}${section.attributes.events_section_bg.data.attributes.url}`}
                                width={358}
                                height={489}
                                className="object-cover w-full h-full "
                                objectFit="cover"
                                priority
                                quality={100}
                                alt=""
                                style={{ width:'100%', height: '489px'}}
                            />
                        </div>
                    ))
                }
                {/* Events List */}
                <div className="flex-1  h-[500px] flex flex-col justify-between overflow-y-scroll scrollbar-thin scrollbar-thumb-accent scrollbar-track-white/10 xl:pr-6">
                    {
                        events.map((event) => {
                            {/* console.log(events); */}
                            return (
                                <div key={event.id} 
                                    className="flex flex-col lg:flex-row justify-between items-center gap-y-4 lg:gap-y-0 text-center lg:text-left  my-2 lg:my-0 border-b border-white/10 pb-10 lg:py-3 last-of-type:border-none first-of-type:pt-0"
                                >
                                    <div className="flex flex-col lg:flex-row items-center gap-x-4">
                                        {/* Day & month */}
                                        <div className="flex flex-col w-[80px] justify-center items-center mb-4 lg:mb-0 leading-tight ">
                                            <div className="text-[28px] font-black text-accent">
                                                {event.attributes.event_day}
                                            </div>
                                             <div className="text-[12px] font-extrabold">
                                                {event.attributes.event_month}
                                            </div>
                                            <div className="text-[12px] font-extrabold">
                                                {event.attributes.event_year}
                                            </div>  
                                        </div>
                                        {/* Location */}
                                        <div className="w-64 flex flex-col gap-y-1 ">
                                            <div className="text-lg leading-none font-bold">
                                                {event.attributes.event_city}, {event.attributes.event_country}
                                            </div>
                                            <div className=" flex items-center gap-x-1 justify-center lg:justify-start">
                                                
                                                {/* <div className="xl:flex-row ">
                                                
                                                    <div className="w-full  font-bold justify-start items-center">{event.location.place}</div>
                                                    
                                                </div> */}
                                                
                                                <div className="text-lg text-accent"><RiMapPin2Fill/></div>
                                                <div className="text-lg font-montserrat font-ligh lg:w-[100%]">{event.attributes.event_address}</div>
                                             

                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-[100px] text-[17px] text-center font-montserrat text-white font-bold">{event.priceRange}</div>
                                    {/* <Link href={event.attributes?.event_ircket_link} className="btn btn-sm btn-accent">Get ticket</Link> */}
                                    <Link 
                                        href={event.attributes?.event_ticket_link ? event.attributes.event_ticket_link : '#'} 
                                        className="btn btn-sm btn-accent"
                                    >
                                        Get ticket
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default EventBox
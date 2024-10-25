//src/components/Hero.jsx


'use client'
//IMPORTS REACT/NEXT:
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../../lib/variants';
//IMPORTS COMPONENTS:
import HeroSlider from "./heroSlider/HeroSlider";
//IMPORTS STYLES:

function Hero() {
    const { events } = useGlobalState();
    // console.log('events', events);
 

    // Generar locationSequence a partir de los eventos
    const locationSequence = [];
    
    events.forEach(event => {
        const { event_city, event_country } = event.attributes;
        locationSequence.push(`${event_city}, ${event_country}`);
        locationSequence.push(3000); // intervalo entre ubicaciones
    });

    // console.log('locationSequence', locationSequence);

    if (events.length === 0) {
        return <div>Loading...</div>;
    }

    

    return (
        <section id="home" className="h-[80vh] lg:h[850px]  py-[100px]">
            <div className="container mx-auto h-full flex justify-center items-center lg:justify-start">
                {/* Text */}
                <div className="max-w-[580px] h-full flex flex-col justify-center items-center lg:items-start z-20 pt-12 gap-y-2">
                    {/* <div className="w-[600px] h-[550px] md:w-[555px] md:h-[555px]"> */}
                    <div className="w-[600px] ">
                        <HeroSlider />
                    </div>
                    
                    <motion.div 
                        className="min-h-[35px] lg:min-h-[40px] flex items-center mb-2 mt-0 text-[24px] lg:text-[26px]"
                        variants={fadeIn('up', 1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{once: false, amount:0.7}}
                    >
                        <div className="hidden lg:flex items-center lg:gap-x-0">
                            <div className="mr-2">New Events: </div>
                        </div> 
                        
                        <TypeAnimation sequence={locationSequence} wrapper='div' speed={10} deletionSpeed={10} repeat={Infinity} cursor={false}/>
                    </motion.div>
                    <motion.div 
                        className=""
                        variants={fadeIn('up', 1.3)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{once: false, amount:0.7}}
                    >
                        {/* <button className="btn btn-sm btn-accent">Bio</button> */}
                        <Link href="/bio" className="btn btn-sm btn-accent">
                            Bio
                        </Link>
                    </motion.div>
                </div>
                {/* Image */}
                <motion.div 
                    className="hidden lg:flex absolute right-0 top-0 lg:right-[-80px] xl:right-[0px] before:w-[784px] before:h-[893px] before:absolute before:right-0 before:top-0 before:bg.singerOverlay before:z-10 ml-[100px] lg:ml-[10px]"
                    variants={fadeIn('left', 0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.7}}
                >
                    <Image 
                        src={'/assets/hero/Luis3.png'}
                        width={617}
                        height={893}
                        priority
                        quality={100}
                        alt=""
                        // style={{ width:'617px', height: '893px'}}
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default Hero;

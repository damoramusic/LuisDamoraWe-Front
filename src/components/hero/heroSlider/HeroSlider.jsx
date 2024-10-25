
// 'use client'

// //IMPORTS REACT/NEXT:
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// //IMPORTS DEPENDENCIES:
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectFade, Autoplay } from 'swiper/modules';
// import { motion } from 'framer-motion';
// //IMPORTS CONTEXT:
// import { useGlobalState } from "@/context/GlobalStateContext";
// //IMPORTS HOOKS:
// import { fadeIn } from '../../../../lib/variants'
// //IMPORTS COMPONENTS:
// //IMPORT ENV:
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// //IMPORTS IMAGES:
// //IMPORTS STYLES:
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/autoplay';
// import styles from './HeroSlider.module.css';

// function HeroSlider() {
//     const { heroSlider } = useGlobalState();
//     console.log('heroSlider', heroSlider)

//     return (
//         <motion.div
//             className=""
//             variants={fadeIn('up', 0.4)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.3 }}
//         >
//             <div className="flex justify-center lg:justify-start items-center mb-2 text-[24px] lg:text-[26px] text-accent font-bold gap-x-2">
//                 <div className="">New</div>
//                 <div className="">tracks</div>
//                 <div className="mr-4">2024</div>
//             </div>
//             <Swiper
//                 modules={[EffectFade, Autoplay]}
//                 effect="fade"
//                 spaceBetween={0}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 22000,
//                     disableOnInteraction: false,
//                 }}
//                 loop={true}
//             >
//                 {heroSlider.map((slide, index) => {
//                     const { hero_slider_new_track, hero_slider_new_track_author, hero_slider_new_track_title, hero_slider_new_track_label, hero_slider_href, hero_slider_new_track_date } = slide.attributes;
//                     const imageUrl = hero_slider_new_track?.data?.attributes?.url;
//                     return (
//                         <SwiperSlide key={index}>
//                             <Link href={hero_slider_href} target="_blank">
//                                 <div className={`flex flex-col items-center md:flex-row md:items-start gap-0 ${styles.swiperSlideLink}`}>
//                                     <div className={styles.swiperSlideContent}>
//                                         <Image
//                                             src={STRAPI_URL + imageUrl}
//                                             alt={`Slide ${index}`}
//                                             layout="responsive"
//                                             width={275}
//                                             height={275}
//                                             className="object-contain"
//                                         />
//                                     </div>
//                                     <div className={`${styles.slideText} w-[300px] h-[120px] md:w-[275px] md:h-[275px] text-[22px]`}>
//                                         <h2 className={`${styles.swiperSlideAuthor} text-[14px] leading-[22px] md:text-[22px] md:leading-[26px] text-accent`}>{hero_slider_new_track_author}</h2>
//                                         <p className="songName text-[14px] leading-[18px] md:text-[22px] md:leading-[26px]">{hero_slider_new_track_title}</p>
//                                         <p className="label text-[12px] leading-[12px] md:text-[18px] md:leading-[20px]">{hero_slider_new_track_label}</p>
//                                         <p className="date text-[10px] leading-[12px] md:text-[12px] md:leading-[14px]">{hero_slider_new_track_date}</p>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </SwiperSlide>
//                     );
//                 })}
//             </Swiper>
//         </motion.div>
//     );
// }

// export default HeroSlider;
// 'use client'

// //IMPORTS REACT/NEXT:
// import Link from "next/link";
// import Image from "next/image";
// //IMPORTS DEPENDENCIES:
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectFade, Autoplay } from 'swiper/modules';
// import { motion } from 'framer-motion';
// //IMPORTS CONTEXT:
// import { useGlobalState } from "@/context/GlobalStateContext";
// //IMPORTS HOOKS:
// import { fadeIn } from '../../../../lib/variants'
// //IMPORTS COMPONENTS:
// //IMPORT ENV:
// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// //IMPORTS IMAGES:
// //IMPORTS STYLES:
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/autoplay';
// import styles from './HeroSlider.module.css';

// function HeroSlider() {
//     const { heroSlider } = useGlobalState();
//     console.log('heroSlider', heroSlider);

//     return (
//         <motion.div
//             className=""
//             variants={fadeIn('up', 0.4)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.3 }}
//         >
//             <div className="flex justify-center lg:justify-start items-center mb-2 text-[24px] lg:text-[26px] text-accent font-bold gap-x-2">
//                 <div className="">New</div>
//                 <div className="">tracks</div>
//                 <div className="mr-4">2024</div>
//             </div>
//             <Swiper
//                 modules={[EffectFade, Autoplay]}
//                 effect="fade"
//                 spaceBetween={0}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 10000, // 10 seconds delay
//                     disableOnInteraction: false,
//                 }}
//                 loop={true}
//             >
//                 {heroSlider.map((slide, index) => {
//                     const { hero_slider_new_track_author, hero_slider_new_track_title, hero_slider_new_track_label, hero_slider_href, hero_slider_new_track_date, hero_slider_new_track } = slide.attributes;
//                     const imageUrl = hero_slider_new_track?.data?.attributes?.url;
//                     return (
//                         <SwiperSlide key={index}>
//                             <Link href={hero_slider_href} target="_blank">
//                                 <div className={`flex flex-col items-center md:flex-row md:items-start gap-0 ${styles.swiperSlideLink}`}>
//                                     <div className={styles.swiperSlideContent}>
//                                         {imageUrl && (
//                                             <Image
//                                                 src={STRAPI_URL + imageUrl}
//                                                 alt={`Slide ${index}`}
//                                                 layout="responsive"
//                                                 width={275}
//                                                 height={275}
//                                                 className="object-contain"
//                                             />
//                                         )}
//                                     </div>
//                                     <div className={`${styles.slideText} w-[300px] h-[120px] md:w-[275px] md:h-[275px] text-[22px]`}>
//                                         <h2 className={`${styles.swiperSlideAuthor} text-[14px] leading-[22px] md:text-[22px] md:leading-[26px] text-accent`}>{hero_slider_new_track_author}</h2>
//                                         <p className="songName text-[14px] leading-[18px] md:text-[22px] md:leading-[26px]">{hero_slider_new_track_title}</p>
//                                         <p className="label text-[12px] leading-[12px] md:text-[18px] md:leading-[20px]">{hero_slider_new_track_label}</p>
//                                         <p className="date text-[10px] leading-[12px] md:text-[12px] md:leading-[14px]">{hero_slider_new_track_date}</p>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </SwiperSlide>
//                     );
//                 })}
//             </Swiper>
//         </motion.div>
//     );
// }

// export default HeroSlider;
// 'use client'

// //IMPORTS REACT/NEXT:
// import Link from "next/link";
// import Image from "next/image";
// //IMPORTS DEPENDENCIES:
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectFade, Autoplay } from 'swiper/modules';
// import { motion } from 'framer-motion';
// //IMPORTS CONTEXT:
// import { useGlobalState } from "@/context/GlobalStateContext";
// //IMPORTS HOOKS:
// import { fadeIn } from '../../../../lib/variants'
// //IMPORTS COMPONENTS:
// //IMPORT ENV:
// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// //IMPORTS IMAGES:
// //IMPORTS STYLES:
// import 'swiper/css';
// import 'swiper/swiper-bundle.css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/autoplay';
// import styles from './HeroSlider.module.css';

// function HeroSlider() {
//     const { heroSlider } = useGlobalState();
//     console.log('heroSlider', heroSlider);

//     return (
//         <motion.div
//             className=""
//             variants={fadeIn('up', 0.4)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.3 }}
//         >
//             <div className="flex justify-center lg:justify-start items-center mb-2 text-[24px] lg:text-[26px] text-accent font-bold gap-x-2">
//                 <div className="">New</div>
//                 <div className="">tracks</div>
//                 <div className="mr-4">2024</div>
//             </div>
//             <Swiper
//                 modules={[EffectFade, Autoplay]}
//                 effect="fade"
//                 spaceBetween={0}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 4000, // 10 seconds delay
//                     disableOnInteraction: false,
//                 }}
//                 loop={true}
//             >
//                 {heroSlider.map((slide, index) => {
//                     const { hero_slider_new_track_author, hero_slider_new_track_title, hero_slider_new_track_label, hero_slider_href, hero_slider_new_track_date, hero_slider_new_track } = slide.attributes;
//                     const imageUrl = hero_slider_new_track?.data?.attributes?.url;
//                     return (
//                         <SwiperSlide key={index}>
//                             <Link href={hero_slider_href} target="_blank">
//                                 <div className={`flex flex-col items-center md:flex-row md:items-start gap-0 ${styles.swiperSlideLink}`}>
//                                     <div className={styles.swiperSlideContent}>
//                                         {imageUrl && (
//                                             <Image
//                                                 src={STRAPI_URL + imageUrl}
//                                                 alt={`Slide ${index}`}
//                                                 layout="responsive"
//                                                 width={275}
//                                                 height={275}
//                                                 className="object-contain"
//                                             />
//                                         )}
//                                     </div>
//                                     <div className={`${styles.slideText} w-[300px] h-[120px] md:w-[275px] md:h-[275px] text-[22px]`}>
//                                         <h2 className={`${styles.swiperSlideAuthor} text-[14px] leading-[22px] md:text-[22px] md:leading-[26px] text-accent`}>{hero_slider_new_track_author}</h2>
//                                         <p className="songName text-[14px] leading-[18px] md:text-[22px] md:leading-[26px]">{hero_slider_new_track_title}</p>
//                                         <p className="label text-[12px] leading-[12px] md:text-[18px] md:leading-[20px]">{hero_slider_new_track_label}</p>
//                                         <p className="date text-[10px] leading-[12px] md:text-[12px] md:leading-[14px]">{hero_slider_new_track_date}</p>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </SwiperSlide>
//                     );
//                 })}
//             </Swiper>
//         </motion.div>
//     );
// }

// export default HeroSlider;


'use client'

//IMPORTS REACT/NEXT:
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../../../lib/variants'
//IMPORTS COMPONENTS:
//IMPORT ENV:
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS IMAGES:
//IMPORTS STYLES:
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import styles from './HeroSlider.module.css';

function HeroSlider() {
    const { heroSlider } = useGlobalState();
    // console.log('heroSlider', heroSlider);

    // useRef to hold the Swiper instance
    const swiperRef = useRef(null);

    // useEffect to update Swiper instance after component mounts
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start();
        }
    }, [heroSlider]);

    return (
        <motion.div
            className=""
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
        >
            <div className="flex justify-center lg:justify-start items-center mb-2 text-[24px] lg:text-[26px] text-accent font-bold gap-x-2">
                <div className="">New</div>
                <div className="">tracks</div>
                <div className="mr-4">2024</div>
            </div>
            <Swiper
                ref={swiperRef}
                modules={[EffectFade, Autoplay]}
                effect="fade"
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 4000, // 4 seconds delay
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {heroSlider.map((slide, index) => {
                    const { hero_slider_new_track_author, hero_slider_new_track_title, hero_slider_new_track_label, hero_slider_href, hero_slider_new_track_date, hero_slider_new_track } = slide.attributes;
                    const imageUrl = hero_slider_new_track?.data?.attributes?.url;
                    return (
                        <SwiperSlide key={index}>
                            <Link href={hero_slider_href} target="_blank">
                                <div className={`flex flex-col items-center md:flex-row md:items-start gap-0 ${styles.swiperSlideLink}`}>
                                    <div className={styles.swiperSlideContent}>
                                        {imageUrl && (
                                            <Image
                                                src={STRAPI_URL + imageUrl}
                                                alt={`Slide ${index}`}
                                                layout="responsive"
                                                width={275}
                                                height={275}
                                                className="object-contain"
                                            />
                                        )}
                                    </div>
                                    <div className={`${styles.slideText} w-[300px] h-[120px] md:w-[275px] md:h-[275px] text-[22px]`}>
                                        <h2 className={`${styles.swiperSlideAuthor} text-[14px] leading-[22px] md:text-[22px] md:leading-[26px] text-accent`}>{hero_slider_new_track_author}</h2>
                                        <p className="songName text-[14px] leading-[18px] md:text-[22px] md:leading-[26px]">{hero_slider_new_track_title}</p>
                                        <p className="label text-[12px] leading-[12px] md:text-[18px] md:leading-[20px]">{hero_slider_new_track_label}</p>
                                        <p className="date text-[10px] leading-[12px] md:text-[12px] md:leading-[14px]">{hero_slider_new_track_date}</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </motion.div>
    );
}

export default HeroSlider;

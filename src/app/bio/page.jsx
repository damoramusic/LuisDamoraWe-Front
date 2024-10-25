//app/bio/page.jsx


'use client'

//IMPORTS REACT/NEXT:
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Zoom } from 'swiper/modules';
import { Gallery, Item } from 'react-photoswipe-gallery';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
import { fadeIn } from '../../../lib/variants'
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS STYLES
import 'photoswipe/dist/photoswipe.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import styles from './bio.module.css';

const Bio = () => {
  const { biography, setBiography, isLoading, setIsLoading } = useGlobalState();
  // console.log('biography', biography);

  useEffect(() => {
    const fetchBiography = async () => {
      if (!biography || Object.keys(biography).length === 0) {
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/biography?populate=*`);
          const data = await response.json();
          setBiography(data.data);
        } catch (error) {
          console.error('Error fetching biography:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBiography();
  }, [biography, setBiography, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!biography || Object.keys(biography).length === 0) {
    return <div>No biography data available.</div>;
  }

  const {
    biography_title,
    biography_description,
    biography_image,
    biography_gallery,
  } = biography.attributes;

  return (
    <motion.div 
      className=""
      variants={fadeIn('up', 0.5)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once: false, amount:0.3}}
    >
      <header className="pt-[80px]">
        {biography_image && (
          <Image
            src={STRAPI_URL + biography_image.data.attributes.url}
            alt="Header Image"
            width={1920}
            height={600}
          />
        )}
      </header>
      <main className="container mx-auto mt-[50px]">
        <h1 className=' text-[28px] text-accent mb-4'>{biography_title}</h1>
        <section>
          <p>{biography_description}</p>
        </section>
        <section className="mt-8 mb-[100px]">
          <Gallery>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Zoom]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: false }}
              zoom
              breakpoints={{
                0:{
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                425:{
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640:{
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768:{
                  slidesPerView: 3,
                  spaceBetween: 70,
                },
                1024:{
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1440:{
                  slidesPerView: 6,
                  spaceBetween: 40,
                },
              }}
            >
              {biography_gallery.data.map((image, index) => (
                <SwiperSlide key={index} className={`${styles.swiperSlide}`}>
                  <Item
                    original={STRAPI_URL + image.attributes.url}
                    thumbnail={STRAPI_URL + image.attributes.url}
                    width={image.attributes.width}
                    height={image.attributes.height}
                    title={image.attributes.name}
                  >
                    {({ ref, open }) => (
                      <Image
                        src={STRAPI_URL + image.attributes.url}
                        alt={image.attributes.name}
                        width={275}
                        height={200}
                        ref={ref}
                        onClick={open}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </Item>
                </SwiperSlide>
              ))}
            </Swiper>
          </Gallery>
        </section>
      </main>
    </motion.div>
  );
};

export default Bio;

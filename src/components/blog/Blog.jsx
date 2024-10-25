//src/components/blog/Blog.jsx

'use client'

//IMPORTS REACT/NEXT:
import {useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import useSWR from "swr";
import {motion} from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../../lib/variants'
//IMPORTS COMPONENTS:
import SectionHeader from "../SectionHeader";
import PostList from "./PostList";
//IMPORTS IMAGES:
//IMPORTS STYLES:

const fetcher = (url) => fetch(url).then((res) => res.json());


const Blog = () => {
    const { postSection } = useGlobalState(); 

    // const { data, error } = useSWR('http://localhost:4000/posts', fetcher);

    // useEffect(() => {
    //     if (data) {
    //         setPosts(data);
    //     }
    //     if (error) {
    //         console.error('Failed to fetch data', error);
    //     }
    // }, [data, error, setPosts]);
    
    // if (error) return <div>Failed to fetch data</div>;
    // if (!data) return <div>Loading...</div>;
 
    return (
        <motion.section id="blog" 
            className="section mt-[25px]"
            variants={fadeIn('up', 0.5)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: true, amount:0.3}}
        >
            {postSection.map((section, index) => (
                <div key={index} className="container mx-auto">
                    <SectionHeader 
                        pretitle={section.attributes.events_section_sub_title} 
                        title={section.attributes.events_section_title}
                    />
                    <PostList />
                </div>
            ))}
        </motion.section>
    )
}

export default Blog;
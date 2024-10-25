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
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS IMAGES:
import {BsArrowRight} from 'react-icons/bs'
import { ClimbingBoxLoader } from "react-spinners";
//IMPORTS STYLES:

function PostList() {
    const { posts, setPosts } = useGlobalState();
    // console.log('desde postList', posts);

    //Get first three posts:
    const firstThreePosts = posts.slice(0, 3);

    return (
        <motion.div 
            className="flex flex-col items-center"
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: true, amount:0.3}}
        >
            <SectionHeader pretitle='Our Blog' title='Latest News'/>
            <div className="flex flex-col lg:flex-row justify-between gap-12 py-10 lg:pt-4 xl:pb-24 border-t border-white/10 ">
                {
                    firstThreePosts.map((post) => {
                        // Destructure post:
                        const { id, attributes: { post_date, post_title, post_description, post_image } } = post;
                        const imageUrl = post_image?.data?.attributes?.url;

                        {/* console.log('postID', id); */}
                        return (
                            <div key={id} className="flex-1">
                                <div className="w-full h-[150px] lg:h-[150px] relative overflow-hidden border-[2px] rounded-[10px] mb-4">
                                    {imageUrl ? (
                                        <Image
                                            className="object-cover w-full h-full mb-6"
                                            src={`${STRAPI_URL}${imageUrl}`}
                                            objectFit="cover"
                                            priority
                                            quality={100}
                                            alt={post_title}
                                            width={300}
                                            height={300}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    ) : (
                                        <Image
                                            className="object-cover w-full h-full mb-6"
                                            src={'/assets/ImgSustitucion.png'}
                                            objectFit="cover"
                                            priority
                                            quality={100}
                                            alt={post_title}
                                            width={300}
                                            height={300}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    )}
                                </div>
                                {/* title */}
                                <div className="text-xl font-medium mb-1 text-accent">
                                    {post_title}
                                </div>
                                {/* date */}
                                <div className="text-[12px] leading-[14px] font-bold mb-4">
                                    {post_date}
                                </div>
                                {/* description */}
                                <p className="text-white/40 mb-4 max-h-[150px] lg:max-h-[360px] overflow-hidden">
                                    {post_description}
                                </p>
                                <Link href={`/posts/${id}`} className="flex items-center gap-x-2 mt-4 group">
                                    Read more
                                    <BsArrowRight className="text-xl group-hover:ml-1 transition-all duration-300"/>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <Link href="/blog" className="btn btn-lg btn-accent">
                View all posts
            </Link>
        </motion.div>
    );
}

export default PostList;

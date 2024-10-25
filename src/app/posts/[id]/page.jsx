'use client';

// IMPORTS REACT/NEXT:
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
// IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
// IMPORTS HOOKS:
import { fadeIn } from '../../../../lib/variants'
// IMPORTS COMPONENTS:
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// IMPORTS IMAGES:
// IMPORTS STYLES:

const fetcher = async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}?populate=*`);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

const Post = () => {
  const { id } = useParams();
  console.log('Post ID:', id);

  const { posts, setPosts } = useGlobalState();
  const [post, setPost] = useState(() => posts.find((p) => p.id === parseInt(id)));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!post) {
      fetcher(id)
        .then((data) => {
          setPost(data.data); // Strapi returns data in a "data" field
          setPosts((prevPosts) => [...prevPosts, data.data]); // Update the global state with the fetched post
        })
        .catch((err) => {
          setError(err.message);
          console.error('Failed to fetch data:', err);
        });
    }
  }, [id, post, setPosts]);

  if (error) return <div>Failed to load post: {error}</div>;
  if (!post || !post.attributes) return <div>Loading...</div>;

  const { post_date, post_title, post_description, post_image, post_link, post_video } = post.attributes;
  const imageUrl = post_image?.data?.attributes?.url;

  return (
    <div className="container mx-auto py-10">
      <div className="mt-[80px] mb-8">
        <Link href="/blog" className="text-accent underline">
          Back to Blog 
        </Link>
      </div>
      
      {
        post_video ? (
          <div className="w-full h-[280px] lg:h-[380px] mb-4 relative overflow-hidden border-[2px] rounded-[10px]">
            {post_video}
          </div>
        ) : (
          <div className="w-full h-[280px] lg:h-[380px] mb-4 relative overflow-hidden border-[2px] rounded-[10px]">
            <Image
              className="object-cover w-full h-full"
              src={STRAPI_URL + imageUrl}
              objectFit="contain"
              priority
              quality={100}
              alt={post_title}
              layout="fill"
            />
          </div>
        )
      }
      <h1 className="text-3xl font-bold mb-4 text-accent">{post_title}</h1>
      <div className="font-bold mb-4 text-[12px] leading-[14px]">{post_date}</div>
      <p className="text-white/40 mb-4">{post_description}</p>
      {
        post_link && <div className="font-bold mb-4 text-[12px] leading-[14px] text-accent underline">{post_link}</div>
      }
    </div>
  );
};

export default Post;

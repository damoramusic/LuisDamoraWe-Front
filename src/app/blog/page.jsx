//app/blog/page.jsx

'use client'

//IMPORTS REACT/NEXT:
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS COMPONENTS:
import { BsArrowRight } from 'react-icons/bs'
import Loader from "@/components/Loader";
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS STYLES:

const POSTS_PER_PAGE = 6; // 3 columnas x 2 filas

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

function AllPosts() {
  const { posts, setPosts, isLoading, setIsLoading } = useGlobalState();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (posts.length === 0) {
      setIsLoading(true);
      fetcher(`${API_URL}/posts?populate=*`)
        .then((data) => {
          setPosts(data.data); // Actualiza el estado global con los posts obtenidos
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          console.error('Failed to fetch data:', err);
          setIsLoading(false);
        });
    }
  }, [posts, setPosts, setIsLoading]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) return <div>Failed to load posts: {error}</div>;

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial='hidden'
      whileInView='show'
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {isLoading ? <Loader /> : (
        <div className="container mx-auto py-10 lg:pt-16 xl:pb-24 border-t border-white/10 mt-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentPosts.map((post) => {
              const { id, attributes: { post_date, post_title, post_description, post_image } } = post;
              const imageUrl = post_image?.data?.attributes?.url;
              return (
                <div key={id} className="flex flex-col">
                  <div className="w-full h-[150px] lg:h-[220px] mb-4 relative overflow-hidden border-[2px] rounded-[10px]">
                    <Image
                      className="object-cover w-full h-full"
                      src={`${STRAPI_URL}${imageUrl}`}
                      objectFit="cover"
                      priority
                      quality={100}
                      alt={post_title}
                      layout="fill"
                    />
                  </div>
                  <div className="text-xl font-medium mb-4 text-accent ">
                    {post_title}
                  </div>
                  <div className="font-bold mb-4 text-[12px] leading-[14px]">
                    {post_date}
                  </div>
                  <p className="text-white/40 mb-4 max-h-[150px] lg:max-h-[360px] overflow-hidden">
                    {post_description}
                  </p>
                  <Link href={`/posts/${id}`} className="flex items-center gap-x-2 mt-auto group">
                    Read more
                    <BsArrowRight className="text-xl group-hover:ml-1 transition-all duration-300"/>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center">
            <nav>
              <ul className="flex space-x-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      className={`px-4 py-2 border ${currentPage === index + 1 ? 'bg-accent text-white' : 'bg-white text-accent'} rounded`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default AllPosts;

// src/components/NavMobile.jsx

'use client';
//IMPORTS REACT/NEXT:
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { useEffect } from "react";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORTS COMPONENTS:
import { RiCloseLine } from 'react-icons/ri';
//IMPORTS IMAGES:
import Socials from "./Socials";
//IMPORTS STYLES:

const links = [
  {
    path: 'home',
    name: 'Home',
    page: '/'
  },
  {
    path: 'discography',
    name: 'Discography',
    page: '/'
  },
  {
    path: 'events',
    name: 'Events',
    page: '/'
  },
  {
    path: 'blog',
    name: 'Blog',
    page: '/'
  },
  {
    path: 'contact',
    name: 'Contact',
    page: '/'
  },
];

function NavMobile() {
  const { isOpenNav, setIsOpenNav } = useGlobalState();

  const handleLinkClick = (link) => {
    if (typeof window !== 'undefined' && window.location.pathname !== link.page) {
      return (
        <Link href={`${link.page}#${link.path}`} key={link.name} className="cursor-pointer border-b-2 border-transparent hover:text-accent transition-all duration-300 text-[30px] uppercase font-bold" onClick={() => setIsOpenNav(false)}>
          {link.name}
        </Link>
      );
    } else {
      return (
        <ScrollLink
          key={link.name}
          to={link.path}
          className="cursor-pointer border-b-2 border-transparent hover:text-accent transition-all duration-300 text-[30px] leading-[38px] uppercase font-bold"
          smooth={true}
          duration={500}
          offset={-100}
          spy={true}
          activeClass='active'
          onClick={() => setIsOpenNav(false)}
        >
          {link.name}
        </ScrollLink>
      );
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  return (
    <nav className={`${isOpenNav ? 'right-0' : '-right-full'} lg:hidden fixed w-full top-0 bottom-0 bg-primary z-20 transition-all duration-500`}>
      <div 
        onClick={() => setIsOpenNav(false)}
        className="absolute right-4 top-5 cursor-pointer"
      >
        <RiCloseLine className="text-5xl"/>
      </div>
      <div className="flex flex-col text-[30px] uppercase font-bold h-full justify-center items-center gap-y-4">
        {links.map((link) => handleLinkClick(link))}
        <Socials 
          containerStyles='flex gap-x-4 text-[30px]' 
          iconStyles='hover:text-accent transition-all duration-300'
        />
      </div>
    </nav>
  );
}

export default NavMobile;

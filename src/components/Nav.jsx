// //src/components/Nav.jsx

'use client';
//IMPORTS REACT/NEXT:
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useMediaQuery } from "react-responsive";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORTS COMPONENTS:
//IMPORTS IMAGES:
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

function Nav({ containerStyles, linkStyles }) {
  const { isOpenNav, setIsOpenNav } = useGlobalState();
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  const handleLinkClick = (link) => {
    if (typeof window !== 'undefined' && window.location.pathname !== link.page) {
      return (
        <Link href={`${link.page}#${link.path}`} key={link.name} className={`${linkStyles} border-b-2 border-transparent cursor-pointer`} onClick={() => setIsOpenNav(false)}>
          {link.name}
        </Link>
      );
    } else {
      return (
        <ScrollLink
          key={link.name}
          to={link.path}
          className={`${linkStyles} hover:text-accent border-b-2 border-transparent cursor-pointer transition-all duration-300`}
          smooth={!isDesktop ? false : true}
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
    <nav className={`${containerStyles}`}>
      {links.map((link) => handleLinkClick(link))}
    </nav>
  );
}

export default Nav;

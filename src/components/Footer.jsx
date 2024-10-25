'use client';

//IMPORTS REACT/NEXT:
import { useState, useEffect } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORTS COMPONENTS:
import Socials from "./Socials";
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

const Footer = () => {
    const handleLinkClick = (link) => {
        if (typeof window !== 'undefined' && window.location.pathname !== link.page) {
            return (
                <Link href={`${link.page}#${link.path}`} key={link.name} className="cursor-pointer border-b-2 border-transparent hover:text-accent transition-all duration-300 text-sm uppercase font-semibold">
                    {link.name}
                </Link>
            );
        } else {
            return (
                <ScrollLink
                    key={link.name}
                    to={link.path}
                    className="cursor-pointer border-b-2 border-transparent hover:text-accent transition-all duration-300 text-sm uppercase font-semibold"
                    smooth={true}
                    duration={500}
                    offset={-75}
                    spy={true}
                    activeClass='active'
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
        <footer className="bg-primary section">
            <div className="container mx-auto flex flex-col items-center gap-y-8">
                {/* Email link */}
                <motion.div 
                    className=""
                    variants={fadeIn('up', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.3}}
                >
                    <h3 className="w-full flex text-[20px] font-semibold leading-tight justify-center">Booking & Remixes:</h3>
                    <Link href="#">
                        <h2 className="text-[24px] lg:text-[38px] font-semibold leading-tight hover:text-accent transition-all duration-300">hello@luisdamora.com</h2>
                    </Link>
                </motion.div>
                {/* Nav */}
                <motion.div className="flex flex-col lg:flex-row justify-center items-center gap-y-4 lg:gap-x-8"
                    variants={fadeIn('up', 0.8)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.4}}
                >
                    {links.map((link) => handleLinkClick(link))}
                </motion.div>
                {/* Socials */}
                <motion.div className=""
                    variants={fadeIn('up', 1.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.3}}
                >
                    <Socials 
                        containerStyles='flex gap-x-4 text-[30px]' 
                        iconStyles='hover:text-accent transition-all duration-300'
                    />
                </motion.div>
                <motion.div 
                    className='text-white border-t border-white py-4'
                    variants={fadeIn('up', 1.6)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.3}}
                >
                    <div className="mx-auto h-full pl-[20px] pr-[20px]">
                        <div className="flex items-center justify-between h-full">
                            <span className="text-white">
                                &copy; Copyright 2024 <strong>The Neway Studio S.L.</strong>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

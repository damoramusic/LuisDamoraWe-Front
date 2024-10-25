//src/components/Header.jsx

'use client'
//IMPORTS REACT/NEXT:
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORTS COMPONENTS:
import NavMobile from "./NavMobile";
import Nav from "./Nav";
import MenuBtn from "./MenuBtn";
import Socials from "./Socials";
//IMPORTS IMAGES:
//IMPORTS STYLES:


const Header = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            //detect Scroll:
            setActive(window.scrollY > 100);
        }
        //ad event Listener:
        window.addEventListener('scroll', handleScroll);
        //Clear event listener:
        return  () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    

    return (
        <header className={`fixed w-full z-50 ${active ? 'bg-[#030315] py-6 transition-all duration-300' : 'bg-transparent py-8 transition-all duration-300'}`}>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                {/* Logo */}
                <Link href="#" className="relative flex   mb-4 lg:mb-0">
                {/* <Image
                    className="object-contain"
                    src={'/assets/Logo.png'}
                    fill
                    // width={617}
                    // height={893}
                    priority
                    quality={100}
                    alt="" 
                /> */}
                <p className="font-michroma text-[28px] leading-none lg:text-[20px] hover:text-accent transition-all duration-300">Luis Damora</p>
                </Link>
                {/* Nav */}
                <Nav containerStyles='hidden lg:flex gap-x-8 items-center'/>
                {/* Nav Mobile */}
                <NavMobile />
                {/* Men btn */}
                <div className="absolute right-7 top-9 z-10 lg:hidden">
                    <MenuBtn />
                </div>
                {/* Social icons */}
                <Socials 
                    containerStyles='flex gap-x-4 text-[24px]' 
                    iconStyles='hover:text-accent transition-all duration-300'
                />
            </div>
        </header>
    )
}

export default Header
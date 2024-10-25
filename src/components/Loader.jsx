//src/components/Loader.jsx

'use client'

//IMPORTS REACT/NEXT:
import {useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import {motion} from 'framer-motion';
import { PuffLoader} from 'react-spinners';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants'
//IMPORTS COMPONENTS:
//IMPORTS IMAGES:
//IMPORTS STYLES:
import React from 'react'

const Loader = () => (
    <motion.div
        className="fixed h-full w-full flex-col inset-0 flex items-center justify-center bg-black bg-opacity-95 z-[150]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
    >   
        <PuffLoader color="#339CE6" size={150} speedMultiplier={1.5}/>
        <span className="ml-3 text-[14px] lg:text-[18px] mt-[20px] text-[#339CE6]">Loading ...</span>
    </motion.div>
);

export default Loader;

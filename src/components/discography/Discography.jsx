// src/components/discography/Discography.jsx

'use client'

// IMPORTS REACT/NEXT:
import { useState, useEffect } from "react";
import Link from "next/link";
// IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
// IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
// IMPORTS HOOKS:
import { fadeIn } from '../../../lib/variants';
// IMPORTS COMPONENTS:
import SectionHeader from "../SectionHeader";
import AlbumSlider from "./AlbumSlider";
// IMPORTS IMAGES:
// IMPORTS STYLES:


function Discography() {
    const { discographySection } = useGlobalState();
    // console.log('discographySection', discographySection)

    return (
        <div id='discography' className="py-[50px] mt-[50px]">
            <div className="container mx-auto">
                {discographySection.map((section, index) => (
                    <SectionHeader 
                        key={index}
                        pretitle={section.attributes.discograp_section_sub_title} 
                        title={section.attributes.discography_section_title}
                    />
                ))}
                {/* AlbumSlider */}
                <motion.div 
                    className=""
                    variants={fadeIn('up', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.3}}
                >
                    <AlbumSlider />
                </motion.div>
            </div>
        </div>
    );
}

export default Discography;

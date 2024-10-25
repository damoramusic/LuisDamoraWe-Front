//src/components/SectionHeader.jsx

'use client'
//IMPORTS REACT/NEXT:
//IMPORTS DEPENDENCIES:
import { motion } from 'framer-motion';
//IMPORTS CONTEXT:
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORTS COMPONENTS:
//IMPORTS IMAGES:
//IMPORTS STYLES:

import React from 'react'

const SectionHeader = ({pretitle, title}) => {
    return (
        <header>
            <motion.h3 className="pretitle text-center"
                      variants={fadeIn('up', 0.2)}
                      initial='hidden'
                      whileInView={'show'}
                      viewport={{once: false, amount:0.3}}
            >
                {pretitle}
            </motion.h3>
            <motion.h2 className="h2 text-center mb-8"
                    variants={fadeIn('up', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once: false, amount:0.3}}
            >
                {title}
            </motion.h2>
        </header>
    )
}

export default SectionHeader
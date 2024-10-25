//src/components/Socials.jsx
'use client'

import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS REACT/NEXT:
import Link from "next/link";
//IMPORTS DEPENDENCIES:
//IMPORTS CONTEXT:
//IMPORTS HOOKS:
//IMPORTS COMPONENTS:
//IMPORTS IMAGES:
import { RiYoutubeFill, RiInstagramFill, RiSpotifyFill, RiSoundcloudFill, RiFacebookBoxFill  } from "react-icons/ri";
import { SiBeatport } from "react-icons/si";
//IMPORTS STYLES:


const iconMap = {
    'youtube': <RiYoutubeFill />,
    'instagram': <RiInstagramFill />,
    'spotify': <RiSpotifyFill />,
    'soundcloud': <RiSoundcloudFill />,
    'facebook': <RiFacebookBoxFill />,
    'beatport': <SiBeatport />
};


function Socials({containerStyles, iconStyles}) {
    const { socials, setSocials } = useGlobalState();
    // console.log('socials', socials);

    return (
        <div className={`${containerStyles}`}>
            {
                socials.map((social, index) => {
                    const { social_url, social_name } = social.attributes;
                    const icon = iconMap[social_name.toLowerCase()];
                    return (
                        <Link key={index} href={social_url} target="_blank" rel="noopener noreferrer">
                            <div className={`${iconStyles}`}>
                                {icon}
                            </div>

                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Socials
//src/components/MenuBtn.jsx
'use client'

//IMPORTS REACT/NEXT:
import { useEffect } from "react";
//IMPORTS DEPENDENCIES:
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
//IMPORTS COMPONENTS:
//IMPORTS IMAGES:
//IMPORTS STYLES:

function MenuBtn() {
    const {isOpenNav, setIsOpenNav} = useGlobalState();
    
    

    return (
        <div 
            onClick={() => setIsOpenNav(true)}
            className="group flex flex-col gap-y-[8px] lg:hidden cursor-pointer group items-end"
        >
            <div className="w-8 h-[3px] bg-white"></div>
            <div className="w-5 group-hover:w-7 h-[3px] bg-white transition-all duration-200"></div>
            <div className="w-8 h-[3px] bg-white"></div>
        </div>
    )
}

export default MenuBtn
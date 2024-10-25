'use client';

//IMPORTS REACT/NEXT:
import { useState } from "react";
import { motion } from 'framer-motion';
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants';
//IMPORTS COMPONENTS:
import SectionHeader from "./SectionHeader";
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORT ENV:
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//IMPORTS STYLES:

function Newsletter() {
    const { newsletter } = useGlobalState();
    // console.log('newsletter', newsletter);
    const [email, setEmail] = useState('');
    const [unsubscribeEmail, setUnsubscribeEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isUnsubscribeModalVisible, setIsUnsubscribeModalVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${STRAPI_URL}/api/mail-lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        email: email // Asegúrate de que este nombre coincide con el nombre del campo en Strapi
                    }
                }),
            });

            if (response.ok) {
                setMessage('¡Thanks to subscribe!');
                setEmail(''); // Limpiar el campo de entrada después de enviar
            } else {
                const errorData = await response.text(); // Cambiado de response.json() a response.text()
                setMessage(`An error happens, try again: ${errorData}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error happens, try again. Few minutes late');
        }

        setTimeout(() => {
            setMessage('');
        }, 10000);
    };

    const handleUnsubscribe = async (event) => {
        event.preventDefault();

        try {
            const searchResponse = await fetch(`${STRAPI_URL}/api/mail-lists?filters[email][$eq]=${unsubscribeEmail}`);
            const searchData = await searchResponse.json();

            if (searchData.data.length > 0) {
                const emailId = searchData.data[0].id;
                const deleteResponse = await fetch(`${STRAPI_URL}/api/mail-lists/${emailId}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    setMessage('Successful unsubcribe.');
                    setUnsubscribeEmail(''); // Limpiar el campo de desuscripción después de enviar
                    closeUnsubscribeModal();
                } else {
                    const errorData = await deleteResponse.text(); // Cambiado de deleteResponse.json() a deleteResponse.text()
                    setMessage(`Hubo un problema al desuscribirte: ${errorData}`);
                }
            } else {
                setMessage('This email is not subscribed to our mailing list.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('There was a problem unsubscribing you. Please try again.');
        }

        setTimeout(() => {
            setMessage('');
        }, 10000);
    };

    const openUnsubscribeModal = () => {
        setIsUnsubscribeModalVisible(true);
    };

    const closeUnsubscribeModal = () => {
        setIsUnsubscribeModalVisible(false);
    };

    const handleClickOutside = (event) => {
        if (event.target.id === 'unsubscribe-modal-overlay') {
            closeUnsubscribeModal();
        }
    };
    

    return (
        <>
            {newsletter.map((newsletterItem, index) => { 
                const { id, attributes: { newsletter_bg } } = newsletterItem;
                const imageUrl = newsletter_bg?.data?.attributes?.url;

                return (
                    <section 
                        key={id} id="contact" 
                        className=" bg-fixed h-[480px] section bg-cover w-full bg-center bg-no-repeat mt-[100px]" 
                        style={{ backgroundImage: `url(${STRAPI_URL + imageUrl})` }}
                    >
                        <div className="container mx-auto h-full">
                            <div className="flex flex-col w-full items-center justify-center">
                                <SectionHeader pretitle='Get in touch' title='Sign up to our newsletter'/>
                            
                                <motion.div 
                                    className="relative flex items-center w-full max-w-xl mt-[30px]"
                                    variants={fadeIn('up', 0.4)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{once: false, amount:0.3}}
                                >
                                    <form onSubmit={handleSubmit} className="w-full flex items-center">
                                        <input 
                                            type="email" 
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-[64px] outline-none rounded-full bg-primary/40 backdrop-blur-[15px] px-8"
                                        />
                                        <button type="submit" 
                                            className="bg-accent absolute right-2 h-[46px] rounded-full text-[15px] hover:text-accent hover:bg-white hover:border-[1px] hover:border-accent transition-all duration-300 px-5"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </motion.div>
                                <div id="responseMessage" className='mt-4'>
                                    {message}
                                </div>
                                <motion.div 
                                    className="mt-[-15px]"
                                    variants={fadeIn('up', 0.8)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{once: false, amount:0.3}}
                                >
                                    <button
                                        onClick={openUnsubscribeModal}
                                        className="text-white hover:text-accent mt-[40px] text-[15px] border-b-2 leading-[25px] transition-all duration-300"
                                    >
                                        Unsubscribe
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                        {isUnsubscribeModalVisible && (
                            <div id="unsubscribe-modal-overlay" className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center" onClick={handleClickOutside}>
                                <div className="bg-primary w-[500px] h-[300px] p-6 rounded-lg border-accent border-[2px]">
                                    <h2 className="text-2xl mb-4 text-white">Unsubscribe</h2>
                                    <form onSubmit={handleUnsubscribe} className="flex flex-col items-center">
                                        <input 
                                            type="email" 
                                            placeholder="Email address"
                                            value={unsubscribeEmail}
                                            onChange={(e) => setUnsubscribeEmail(e.target.value)}
                                            className="w-full h-[40px] outline-none rounded-md px-4 mb-4 text-primary"
                                        />
                                        <button type="submit" 
                                            className="bg-accent right-2 h-[46px] rounded-full text-[15px] leading-[20px] hover:text-accent hover:bg-white hover:border-[1px] hover:border-accent transition-all duration-300 px-5"
                                            // onClick={closeUnsubscribeModal}
                                        >
                                            Unsubscribe
                                        </button>
                                        <button type="button" onClick={closeUnsubscribeModal} className="mt-4 text-gray-500 hover:text-red-500 transition-all duration-300">
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </section>
                );
            })}
        </>
    );
}

export default Newsletter;


//src/app/_app.jsx

import { useEffect } from 'react';
import { Alex_Brush, Montserrat, Michroma } from 'next/font/google';
import { GlobalStateContextProvider, useGlobalState } from '@/context/GlobalStateContext';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import '@/styles/globals.css';

const alexBrush = Alex_Brush({ 
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-alexBrush' 
});

const montserrat = Montserrat({ 
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-montserrat' 
});

const michroma = Michroma({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-michroma'
});



function MyApp({ Component, pageProps }) {
    const { isLoading, setIsLoading } = useGlobalState();
    setTimeout(() => {
        setIsLoading(false);
    }, 5000);

    return (
        <GlobalStateContextProvider>{
            isLoading && <Loader />}
            {!isLoading && (
                <div className={`${alexBrush.variable} ${montserrat.variable} ${michroma.variable} overflow-x-hidden relative`}>
                

                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                    <PrivacyPolicy />
                
                </div>    
            )}
        </GlobalStateContextProvider>
    );
}

export default MyApp;

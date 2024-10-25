//src/app/layout.jsx
 
//IMPORTS REACT/NEXT:
import { Alex_Brush, Montserrat, Michroma } from 'next/font/google';
//IMPORTS DEPENDENCIES:
//IMPORTS CONTEXT:
import GlobalStateContextProvider from '@/context/GlobalStateContext';
 
//IMPORTS HOOKS:
//IMPORTS COMPONENTS:
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from '@/components/PrivacyPolicy';
//IMPORTS IMAGES:
//IMPORTS STYLES:
import "./globals.css";

const alexBrush = Alex_Brush({ 
    weight: ['400'],
    subsets: ["latin"],
    variable: '--font-alexBrush' 
});

const montserrat = Montserrat({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: '--font-montserrat' 
});

const michroma = Michroma({
    weight: ['400'],
    subsets: ["latin"],
    variable: '--font-michroma'
  });

export const metadata = {
    title: "Luis Damora",
    description: "Deejay, music and techno producer",
};

export default function RootLayout({ children }) {
  

    return (
        <GlobalStateContextProvider>
            <html lang="en">
                <body className={`${alexBrush.variable} ${montserrat.variable} ${michroma.variable} overflow-x-hidden relative`}
                > 
                    <Header />
                    {children}
                    <Footer />
                    <PrivacyPolicy />
                </body>
            </html>
        </GlobalStateContextProvider>
    );
}

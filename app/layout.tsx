import type {Metadata,Viewport} from 'next';
import {Cormorant_Garamond,Inter,Caveat} from 'next/font/google';
import './globals.css';
import {config} from '../data/content';

const serif=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],style:['normal','italic'],variable:'--font-serif',display:'swap'});
const sans=Inter({subsets:['latin'],variable:'--font-sans',display:'swap'});
const hand=Caveat({subsets:['latin'],variable:'--font-hand',display:'swap'});

export const metadata:Metadata={title:config.siteTitle,description:config.siteDescription,openGraph:{title:config.siteTitle,description:config.siteDescription,type:'website'},twitter:{card:'summary_large_image',title:config.siteTitle,description:config.siteDescription}};
export const viewport:Viewport={themeColor:'#F2F7FC',width:'device-width',initialScale:1};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang='en' className={`${serif.variable} ${sans.variable} ${hand.variable}`}><body>{children}</body></html>);
}

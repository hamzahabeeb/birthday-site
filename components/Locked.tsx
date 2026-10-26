'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {MotionConfig,motion} from 'framer-motion';

const pad=(n:number)=>String(n).padStart(2,'0');

// Shown before the birthday. Contains only the countdown; no other content is sent to the browser.
export default function Locked({targetISO,timezone,label,title,subtitle}:{targetISO:string;timezone:string;label:string;title:string;subtitle:string}){
  const router=useRouter();
  const target=new Date(targetISO).getTime();
  const [now,setNow]=useState<number|null>(null);
  useEffect(()=>{setNow(Date.now());const t=setInterval(()=>setNow(Date.now()),1000);return ()=>clearInterval(t);},[]);
  useEffect(()=>{if(now!==null&&now>=target) router.refresh();},[now,target,router]);
  const d=now===null?0:Math.max(0,target-now);
  const units=[['Days',Math.floor(d/864e5)],['Hours',Math.floor(d/36e5)%24],['Minutes',Math.floor(d/6e4)%60],['Seconds',Math.floor(d/1e3)%60]] as const;
  const dateLabel=new Date(target).toLocaleDateString('en-IN',{timeZone:timezone,day:'numeric',month:'long',year:'numeric'});
  return (<MotionConfig reducedMotion='user'><main className='relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center'>
    {Array.from({length:10},(_,i)=>(<span key={i} aria-hidden='true' className='petal' style={{left:(i*10+3)+'%',animationDuration:(9+(i%4)*3)+'s',animationDelay:(i*-1.7)+'s'}}/>))}
    <p className='font-hand text-2xl text-burgundy/80'>{label}</p>
    <motion.div aria-hidden='true' className='my-5' animate={{y:[0,-8,0]}} transition={{duration:4,repeat:Infinity}}>
      <svg width='96' height='72' viewBox='0 0 96 72' fill='none'><rect x='2' y='6' width='92' height='64' rx='4' fill='#DCEAF7' stroke='#5B8FC7'/><path d='M2 10l46 34 46-34' stroke='#5B8FC7'/><path d='M48 38s-9-5.5-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.500-9 11-9 11z' fill='#1F4E8C'/></svg>
    </motion.div>
    <h1 className='font-serif text-5xl leading-tight text-burgundy sm:text-7xl'>{title}</h1>
    <p className='mt-4 max-w-md font-serif text-xl italic text-ink'>{subtitle}</p>
    <div className='mt-8 min-h-[110px]'>
      {now===null?null:(<div><p className='mb-2 text-xs uppercase tracking-widest text-burgundy/80'>Counting down to {dateLabel}</p><div className='grid grid-cols-4 gap-2'>{units.map(([l,v])=>(<div key={l} className='w-[70px] rounded-sm border border-blush bg-cream py-2'><div className='font-serif text-3xl text-burgundy'>{pad(v)}</div><div className='text-[10px] uppercase tracking-wider text-ink/80'>{l}</div></div>))}</div></div>)}
    </div>
    <p className='mt-6 font-hand text-xl text-burgundy/80'>Your little world opens when the countdown ends</p>
  </main></MotionConfig>);
}

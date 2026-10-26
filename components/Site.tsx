'use client';
import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,MotionConfig,motion,useReducedMotion} from 'framer-motion';
import {config,photos,letters,reasons,surprises} from '../data/content';

function Head({k,children}:{k:string;children:React.ReactNode}){
  return (<div className='mb-10 text-center'><p className='font-hand text-2xl text-burgundy/80'>{k}</p><h2 className='font-serif text-4xl text-burgundy sm:text-5xl'>{children}</h2></div>);
}

function Modal({open,onClose,label,full,children}:{open:boolean;onClose:()=>void;label:string;full?:boolean;children:React.ReactNode}){
  useEffect(()=>{
    if(!open) return;
    const f=(e:KeyboardEvent)=>{if(e.key==='Escape') onClose();};
    window.addEventListener('keydown',f);
    const o=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return ()=>{window.removeEventListener('keydown',f);document.body.style.overflow=o;};
  },[open,onClose]);
  return (<AnimatePresence>{open&&(
    <motion.div role='dialog' aria-modal='true' aria-label={label} className='fixed inset-0 z-[70] flex items-center justify-center bg-burgundy/60 p-3 backdrop-blur-sm' initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
      <motion.div className={'relative w-full overflow-y-auto bg-ivory shadow-2xl '+(full?'h-full max-w-none':'max-h-[88vh] max-w-lg rounded-sm')} initial={{y:24,scale:0.97}} animate={{y:0,scale:1}} exit={{y:24}} onClick={e=>e.stopPropagation()}>
        {children}
        <button autoFocus onClick={onClose} aria-label='Close' className='absolute right-3 top-3 h-11 w-11 rounded-full bg-cream text-xl text-burgundy'>✕</button>
      </motion.div>
    </motion.div>)}</AnimatePresence>);
}

function Typed({text}:{text:string}){
  const r=useReducedMotion();
  const [n,setN]=useState(0);
  useEffect(()=>{
    if(r){setN(text.length);return;}
    setN(0);
    const t=setInterval(()=>setN(v=>{if(v>=text.length){clearInterval(t);return v;}return v+1;}),24);
    return ()=>clearInterval(t);
  },[text,r]);
  return (<div onClick={()=>setN(text.length)}>
    <p className='sr-only'>{text.split('|').join(' ')}</p>
    <div aria-hidden='true'>{text.slice(0,n).split('|').map((p,i)=>(<p key={i} className='mb-4 font-serif text-xl leading-relaxed'>{p}</p>))}</div>
    {n<text.length&&<p className='text-xs text-burgundy/70'>tap to reveal all</p>}
  </div>);
}

function Confetti(){
  const r=useReducedMotion();
  if(r) return null;
  const sym=['✦','♥','·'];
  return (<div aria-hidden='true' className='pointer-events-none absolute inset-0 overflow-hidden'>{Array.from({length:36},(_,i)=>(
    <motion.span key={i} className='absolute top-0 text-rose' style={{left:((i*37)%100)+'%'}} initial={{y:-20,opacity:0}} animate={{y:'100vh',opacity:[0,1,1,0],rotate:360}} transition={{duration:4+(i%5),delay:(i%9)*0.25,repeat:Infinity}}>{sym[i%3]}</motion.span>))}</div>);
}

function Player(){
  const ref=useRef<HTMLAudioElement>(null);
  const [playing,setPlaying]=useState(false);
  const [muted,setMuted]=useState(false);
  const [prog,setProg]=useState(0);
  const [bad,setBad]=useState(false);
  const toggle=async()=>{
    const a=ref.current;
    if(!a||bad) return;
    try{if(a.paused){await a.play();setPlaying(true);}else{a.pause();setPlaying(false);}}catch{setBad(true);setPlaying(false);}
  };
  useEffect(()=>{
    const f=()=>{const a=ref.current;if(a&&a.paused&&!bad){a.play().then(()=>setPlaying(true)).catch(()=>setBad(true));}};
    window.addEventListener('start-music',f);
    return ()=>window.removeEventListener('start-music',f);
  },[bad]);
  const btn='h-11 w-11 shrink-0 rounded-full bg-cream text-burgundy';
  return (<div role='region' aria-label='Music player' className='fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-md items-center gap-2 rounded-full border border-blush bg-ivory/95 px-2 py-1.5 shadow-lg backdrop-blur' style={{marginBottom:'env(safe-area-inset-bottom)'}}>
    <audio ref={ref} src={config.music.src} preload='none' onError={()=>{setBad(true);setPlaying(false);}} onTimeUpdate={e=>{const a=e.currentTarget;if(a.duration) setProg((a.currentTime/a.duration)*100);}} onEnded={()=>setPlaying(false)} loop={false}/>
    <button className={btn} onClick={toggle} aria-label={playing?'Pause music':'Play music'} disabled={bad}>{playing?'❚❚':'▶'}</button>
    {bad?(<p className='flex-1 px-2 text-xs text-burgundy'>Add /public/music/song.mp3 to play music</p>):(<>
      <div className='min-w-0 flex-1'><p className='truncate text-xs text-burgundy'>{config.music.title}</p>
      <input type='range' aria-label='Song progress' min={0} max={100} value={prog} className='h-3 w-full accent-burgundy' onChange={e=>{const a=ref.current;if(a&&isFinite(a.duration)){a.currentTime=(Number(e.target.value)/100)*a.duration;setProg(Number(e.target.value));}}}/></div>
      <button className={btn} aria-label={muted?'Unmute':'Mute'} aria-pressed={muted} onClick={()=>{const a=ref.current;if(a){a.muted=!muted;setMuted(!muted);}}}>{muted?'🔇':'🔊'}</button></>)}
  </div>);
}

export default function Site(){
  const [photo,setPhoto]=useState<number|null>(null);
  const [letter,setLetter]=useState<number|null>(null);
  const [shown,setShown]=useState(3);
  const [env,setEnv]=useState(false);
  const [heart,setHeart]=useState(false);
  const [last,setLast]=useState(false);
  const [door,setDoor]=useState(false);
  useEffect(()=>{
    if(photo===null) return;
    const f=(e:KeyboardEvent)=>{
      if(e.key==='ArrowRight') setPhoto(p=>p===null?p:(p+1)%photos.length);
      if(e.key==='ArrowLeft') setPhoto(p=>p===null?p:(p-1+photos.length)%photos.length);
    };
    window.addEventListener('keydown',f);
    return ()=>window.removeEventListener('keydown',f);
  },[photo]);
  const tilt=[-2,1.5,-1,2];
  const slip='rounded-sm border border-blush bg-cream p-4 shadow-sm';
  return (<MotionConfig reducedMotion='user'><main className='pb-28'>
    <section className='relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center'>
      {Array.from({length:10},(_,i)=>(<span key={i} aria-hidden='true' className='petal' style={{left:(i*10+3)+'%',animationDuration:(9+(i%4)*3)+'s',animationDelay:(i*-1.7)+'s'}}/>))}
      <p className='font-hand text-2xl text-burgundy/80'>{config.hero.label}</p>
      <motion.div aria-hidden='true' className='my-5' animate={{y:[0,-8,0]}} transition={{duration:4,repeat:Infinity}}>
        <svg width='96' height='72' viewBox='0 0 96 72' fill='none'><rect x='2' y='6' width='92' height='64' rx='4' fill='#F4EADB' stroke='#B76E79'/><path d='M2 10l46 34 46-34' stroke='#B76E79'/><path d='M48 38s-9-5.5-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.500-9 11-9 11z' fill='#6E2233'/></svg>
      </motion.div>
      <h1 className='font-serif text-5xl leading-tight text-burgundy sm:text-7xl'>{config.hero.title}</h1>
      <p className='mt-4 max-w-md font-serif text-xl italic text-ink'>{config.hero.subtitle}</p>
      <div className='mt-8'><p className='font-serif text-3xl text-burgundy'>{config.celebration.title}</p><p className='mt-2 text-ink'>{config.celebration.text}</p></div>
      <button className='mt-8 rounded-full bg-burgundy px-8 py-3 text-ivory shadow-lg' onClick={()=>{window.dispatchEvent(new Event('start-music'));document.getElementById('memories')?.scrollIntoView({behavior:'smooth'});}}>{config.hero.button}</button>
    </section>

    <section id='memories' className='mx-auto max-w-4xl px-5 py-20'>
      <Head k='Polaroids &amp; prints'>{config.memoriesTitle}</Head>
      <ul className='grid grid-cols-2 gap-5 md:grid-cols-3'>{photos.map((p,i)=>(
        <motion.li key={p.src} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} style={{rotate:tilt[i%4]}}>
          <button className='block w-full bg-white p-2 pb-6 shadow-md transition-transform hover:scale-[1.03]' onClick={()=>setPhoto(i)} aria-label={'Open photo: '+p.caption}>
            <img src={p.src} alt={p.alt} loading='lazy' width={400} height={500} className={'w-full object-cover '+(i%3===1?'aspect-square':'aspect-[4/5]')}/>
            <span className='mt-2 block font-hand text-lg leading-tight text-ink'>{p.caption}</span>
            {p.placeholder&&<span className='text-[10px] uppercase tracking-wider text-burgundy/80'>Sample placeholder</span>}
          </button>
        </motion.li>))}</ul>
    </section>
    <Modal open={photo!==null} onClose={()=>setPhoto(null)} label='Photo viewer'>{photo!==null&&(<figure className='p-4 pt-16 text-center'>
      <img src={photos[photo].src} alt={photos[photo].alt} className='mx-auto max-h-[60vh] w-auto bg-white p-2 shadow'/>
      <figcaption className='mt-4 font-hand text-2xl text-ink'>{photos[photo].caption}</figcaption>
      <p className='text-sm text-burgundy/80'>{[photos[photo].date,photos[photo].location].filter(Boolean).join(' · ')}</p>
      <div className='mt-4 flex justify-center gap-4'><button className='h-11 rounded-full bg-cream px-5 text-burgundy' onClick={()=>setPhoto((photo-1+photos.length)%photos.length)}>← Prev</button><button className='h-11 rounded-full bg-cream px-5 text-burgundy' onClick={()=>setPhoto((photo+1)%photos.length)}>Next →</button></div>
    </figure>)}</Modal>

    <section className='mx-auto max-w-3xl px-5 py-20'>
      <Head k='Open one when you need it'>{config.lettersTitle}</Head>
      <ul className='grid grid-cols-2 gap-4'>{letters.map((l,i)=>(<li key={l.id}><motion.button whileTap={{scale:0.97}} className={slip+' flex h-full min-h-[130px] w-full flex-col items-center justify-center text-center'} onClick={()=>setLetter(i)}><span aria-hidden='true' className='mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-burgundy text-sm text-ivory'>♥</span><span className='font-serif text-lg text-burgundy'>{l.title}</span></motion.button></li>))}</ul>
    </section>
    <Modal open={letter!==null} onClose={()=>setLetter(null)} label='Letter'>{letter!==null&&(<article className='p-6 pt-16'>
      <h3 className='mb-4 font-hand text-3xl text-burgundy'>{letters[letter].title}</h3>
      <Typed text={letters[letter].body}/>
    </article>)}</Modal>

    <section className='mx-auto max-w-3xl px-5 py-20'>
      <Head k='Reasons I love you'>{config.reasonsTitle}</Head>
      <ol className='grid gap-3 sm:grid-cols-2'>{reasons.slice(0,shown).map((r,i)=>(<motion.li key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className={slip}><span className='font-hand text-xl text-burgundy'>No. {i+1}</span><p className='font-serif text-lg'>{r}</p></motion.li>))}</ol>
      {shown<reasons.length?(<div className='mt-6 flex justify-center gap-3'><button className='rounded-full bg-burgundy px-6 py-3 text-ivory' onClick={()=>setShown(s=>Math.min(reasons.length,s+1))}>Reveal another</button><button className='rounded-full bg-cream px-6 py-3 text-burgundy' onClick={()=>setShown(reasons.length)}>Show all</button></div>):null}
    </section>

    <section className='mx-auto max-w-3xl px-5 py-16 text-center'>
      <Head k='Little secrets'>Hidden surprises</Head>
      <div className='grid gap-4 sm:grid-cols-2'>
        <button className={slip+' min-h-[140px] text-left'} aria-expanded={env} onClick={()=>setEnv(!env)}><span className='font-hand text-xl text-burgundy'>{env?'Opened ✉️':surprises.envelope.label}</span>{env&&<motion.p initial={{opacity:0}} animate={{opacity:1}} className='mt-2 font-serif text-lg'>{surprises.envelope.message}</motion.p>}</button>
        <button className={slip+' min-h-[140px] text-left'} aria-expanded={heart} onClick={()=>setHeart(!heart)}><span className='font-hand text-xl text-burgundy'>{heart?'♥':surprises.heart.label}</span>{heart&&<motion.p initial={{opacity:0}} animate={{opacity:1}} className='mt-2 font-serif text-lg'>{surprises.heart.message}</motion.p>}</button>
      </div>
    </section>

    <section className='px-6 py-24 text-center'>
      <p className='mx-auto max-w-xl font-serif text-3xl italic text-burgundy sm:text-4xl'>{config.final.message}</p>
      <p className='mx-auto mt-8 max-w-md font-serif text-xl'>{config.final.wish}</p>
      <p className='mt-6 font-hand text-2xl text-burgundy'>{config.final.signature}</p>
      <button className='mt-12 rounded-full border border-burgundy px-7 py-3 text-burgundy' onClick={()=>setLast(true)}>{surprises.last.button}</button>
    </section>
    <Modal open={last} onClose={()=>setLast(false)} label='Final letter' full><div className='relative mx-auto flex min-h-full max-w-xl flex-col justify-center p-8'><Confetti/><h3 className='relative mb-6 font-hand text-4xl text-burgundy'>{surprises.last.title}</h3><div className='relative'><Typed text={surprises.last.body}/></div><p className='relative mt-4 font-hand text-2xl text-burgundy'>{surprises.last.signature}</p></div></Modal>
    <section className='px-6 pb-24 pt-8 text-center'>
      <p className='font-hand text-2xl text-burgundy/80'>{surprises.door.prompt}</p>
      <button className='mt-4 rounded-full bg-burgundy px-9 py-4 text-lg text-ivory shadow-lg' onClick={()=>setDoor(true)}>{surprises.door.button}</button>
    </section>
    <Modal open={door} onClose={()=>setDoor(false)} label='Surprise' full><div className='relative mx-auto flex min-h-full max-w-xl flex-col justify-center p-8 text-center'><Confetti/><p aria-hidden='true' className='relative mb-4 text-6xl'>🚪</p><h3 className='relative mb-6 font-serif text-4xl text-burgundy'>{surprises.door.title}</h3><div className='relative'><Typed text={surprises.door.body}/></div><p className='relative mt-4 font-hand text-2xl text-burgundy'>{surprises.door.signature}</p></div></Modal>
  </main><Player/></MotionConfig>);
}

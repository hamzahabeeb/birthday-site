'use client';
import {useEffect,useRef,useState} from 'react';
import {config} from '../data/content';

export default function Player(){
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
  const autoMuted=useRef(false);
  useEffect(()=>{
    const a=ref.current;
    if(!a) return;
    const unmute=()=>{if(autoMuted.current){autoMuted.current=false;a.muted=false;setMuted(false);}};
    const start=()=>{
      if(!a.paused||bad) return;
      a.play().then(()=>{setPlaying(true);unmute();}).catch(e=>{
        if(e?.name!=='NotAllowedError'){setBad(true);return;}
        // Sound is blocked until the visitor interacts, but muted playback is allowed: start silently, then unmute on the first tap.
        a.muted=true;autoMuted.current=true;setMuted(true);
        a.play().then(()=>setPlaying(true)).catch(()=>{autoMuted.current=false;a.muted=false;setMuted(false);});
      });
    };
    const first=()=>{unmute();start();['pointerdown','keydown','touchstart'].forEach(t=>window.removeEventListener(t,first));};
    start();
    ['pointerdown','keydown','touchstart'].forEach(t=>window.addEventListener(t,first));
    window.addEventListener('start-music',first);
    return ()=>{['pointerdown','keydown','touchstart'].forEach(t=>window.removeEventListener(t,first));window.removeEventListener('start-music',first);};
  },[bad]);
  const btn='h-11 w-11 shrink-0 rounded-full bg-cream text-burgundy';
  return (<div role='region' aria-label='Music player' className='fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-md items-center gap-2 rounded-full border border-blush bg-ivory/95 px-2 py-1.5 shadow-lg backdrop-blur' style={{marginBottom:'env(safe-area-inset-bottom)'}}>
    <audio ref={ref} src={config.music.src} autoPlay playsInline preload='auto' onError={()=>{setBad(true);setPlaying(false);}} onTimeUpdate={e=>{const a=e.currentTarget;if(a.duration) setProg((a.currentTime/a.duration)*100);}} onEnded={()=>setPlaying(false)} loop={false}/>
    <button className={btn} onClick={toggle} aria-label={playing?'Pause music':'Play music'} disabled={bad}>{playing?'❚❚':'▶'}</button>
    {bad?(<p className='flex-1 px-2 text-xs text-burgundy'>Add /public/music/song.mp3 to play music</p>):(<>
      <div className='min-w-0 flex-1'><p className='truncate text-xs text-burgundy'>{config.music.title}</p>
      <input type='range' aria-label='Song progress' min={0} max={100} value={prog} className='h-3 w-full accent-burgundy' onChange={e=>{const a=ref.current;if(a&&isFinite(a.duration)){a.currentTime=(Number(e.target.value)/100)*a.duration;setProg(Number(e.target.value));}}}/></div>
      <button className={btn} aria-label={muted?'Unmute':'Mute'} aria-pressed={muted} onClick={()=>{const a=ref.current;if(a){a.muted=!muted;setMuted(!muted);}}}>{muted?'🔇':'🔊'}</button></>)}
  </div>);
}

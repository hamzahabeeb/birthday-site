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
  useEffect(()=>{
    const start=()=>{const a=ref.current;if(a&&a.paused&&!bad){a.play().then(()=>setPlaying(true)).catch(e=>{if(e?.name!=='NotAllowedError') setBad(true);});}};
    // Browsers block sound until the visitor interacts, so retry on the first tap, click or key press.
    const first=()=>{start();['pointerdown','keydown'].forEach(t=>window.removeEventListener(t,first));};
    start();
    ['pointerdown','keydown'].forEach(t=>window.addEventListener(t,first));
    window.addEventListener('start-music',start);
    return ()=>{['pointerdown','keydown'].forEach(t=>window.removeEventListener(t,first));window.removeEventListener('start-music',start);};
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

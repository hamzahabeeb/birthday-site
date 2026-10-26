import {config} from '../data/content';
import Site from '../components/Site';
import Locked from '../components/Locked';

export const dynamic='force-dynamic';

export default function Page({searchParams}:{searchParams:{[k:string]:string|string[]|undefined}}){
  const key=process.env.PREVIEW_KEY;
  const preview=!!key&&searchParams.preview===key;
  const unlocked=preview||Date.now()>=new Date(config.birthdayISO).getTime();
  if(unlocked) return <Site/>;
  return <Locked targetISO={config.birthdayISO} timezone={config.timezone} label={config.hero.label} title={config.hero.title} subtitle={config.hero.subtitle}/>;
}

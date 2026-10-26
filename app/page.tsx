import {config} from '../data/content';
import Site from '../components/Site';
import Locked from '../components/Locked';

// Checked on the server at request time, so changing a device clock cannot unlock the site early.
export const dynamic='force-dynamic';

export default function Page(){
  const unlocked=Date.now()>=new Date(config.birthdayISO).getTime();
  if(unlocked) return <Site/>;
  return <Locked targetISO={config.birthdayISO} timezone={config.timezone} label={config.hero.label} title={config.hero.title} subtitle={config.hero.subtitle}/>;
}

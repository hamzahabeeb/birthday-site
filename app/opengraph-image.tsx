import {ImageResponse} from 'next/og';
export const runtime='edge';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#FBF6EE',color:'#6E2233',fontSize:84}}><div>Happy Birthday, My Love</div><div style={{fontSize:36,marginTop:24,color:'#B76E79'}}>A little something made just for you</div></div>,size);
}

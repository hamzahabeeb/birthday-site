import {ImageResponse} from 'next/og';
export const runtime='edge';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#F2F7FC',color:'#1F4E8C',fontSize:84}}><div>Happy Birthday, My Love</div><div style={{fontSize:36,marginTop:24,color:'#5B8FC7'}}>A little something made just for you</div></div>,size);
}

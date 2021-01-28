import {useEffect, useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';

export default function useAlan() {
  
  const [alanInstance, setAlanInstance] = useState()

  useEffect(()=>{
    if(alanInstance != null) return
  setAlanInstance( 
    alanBtn({
  top: "15px",
  left : "15px",
  key:'57e8946c228b23ec8d3d743c048476172e956eca572e1d8b807a3e2338fdd0dc/stage', 
  onCommand : (commandData) => {
    console.log(commandData);
  }
}))
  }, [])
  return null
}

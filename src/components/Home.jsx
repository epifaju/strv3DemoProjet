import React, {useState, useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../actions.js';

export default function Home(p) {
  const dispatch = useDispatch();
  return <div>Home - <a href='#' onClick={() => dispatch(setLocation('info'))}>vers info</a></div>;
 //const [f, setF] = useState(1);
 //const r = useRef(1);
 /*return <div>
   {f}
    <div onClick={() => {
      setF(f == 1 ? 2 : 1);
    }}>CHANGER</div>
  </div>;*/
/**  */
/*const [f, setF] = useState(null);
const r = useRef(1);
useEffect(
 ()=> {
   const u=api(p)
   setF(u);
 }, [p]
);
return <div>
  {f}
   <div onClick={() => {
     setF(f == 1 ? 2 : 1);
   }}ref={r}>CHANGER</div>
<div>{f?f: "En cours de chargement"}</div>
 </div>; */

  };


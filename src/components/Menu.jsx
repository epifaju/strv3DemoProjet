import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setLocation } from '~/actions.js';
import {push} from 'connected-react-router';

const liens = [{titre : "Accueil", code:"/"}, {titre:"Information",code:"/informations"}, {titre:"Personne", code:"/personnes"}];
export default function Menu() {
  const location = useSelector(state => state.router.location.pathname);
  const dispatch = useDispatch();
  return <div>
          {liens.map((lien, i) => 
             <span key={i} onClick={()=>dispatch(push(lien.code)) } style={{fontWeight:location.startsWith(lien.code) ?"bold" :null}}>{lien.titre}</span>
            )}
        </div>;
}

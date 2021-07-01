import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import MasterPage from './MasterPage.jsx';
import {faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";
import Icon from './Icon.jsx';

export default function Info() {
  const loginAncien = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(loginAncien);
  return <MasterPage>
    <div>
      <label>Connexion : </label>
      <input type='text' value={login} onInput={(e) => setLogin(e.target.value)}/>
      <Icon style={{cursor:'pointer'}} fa={faArrowAltCircleRight} onClick={()=>dispatch({type:"SET_LOGIN", login}) }/>
    </div>
    </MasterPage>;
}

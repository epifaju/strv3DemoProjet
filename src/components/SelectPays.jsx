import { useSelector, useDispatch } from "react-redux";
import { getPays } from "~/actions.js";
import React from "react";

export default function SelectPays({onChangePays,...params}) {
      //Récupération des pays dans l'état global --> useSelector
  const pays = useSelector((state) => state.referentiel.pays);
  const dispatch = useDispatch();
  if (!pays) {
    dispatch(getPays());
  }
    return (
        <select name="nationalite" onChange={e=>onChangePays(e.target.value)} {...params}>
            <option value=""></option>
        {
          //? permet d'arrêter l'exécution si pays est null
          pays?.map((p) =>(
            <option key={p.code} value={p.code}>{p.titre}</option>
          ))
        }
      </select>
    );
    
  };
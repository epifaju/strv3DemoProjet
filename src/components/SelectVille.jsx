import { useSelector, useDispatch } from "react-redux";
import { getPays } from "~/actions.js";
import React from "react";

export default function SelectVille({onChangeVille,paysSelected,...params}) {
      //Récupération des pays dans l'état global --> useSelector
  const pays = useSelector((state) => state.referentiel.pays);
  const dispatch = useDispatch();
  if (!pays) {
    dispatch(getPays());
  }
    return (
        <select name="ville" onChange={e=>onChangeVille(e.target.value)} {...params}>
            <option value=""></option>
        {
          //? permet d'arrêter l'exécution si pays est null
          paysSelected && pays?.find((p) =>p.code===paysSelected).villes.map(v =>
              <option key={v} value={v}>{v}</option>
            )
        }
      </select>
    );
    
  };
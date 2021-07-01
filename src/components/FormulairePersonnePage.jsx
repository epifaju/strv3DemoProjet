import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import FormulairePersonne from './FormulairePersonne.jsx';

export default function FormulairePersonnePage() {
    const { id } = useParams();
    return <FormulairePersonne id={id}/>
}
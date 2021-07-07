import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import Home from './Home.jsx';
import Info from './Info.jsx';
import Page404 from './Page404.jsx';
import Bandeau from './Bandeau.jsx'
import Menu from './Menu.jsx';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import Hero from './Hero.js';
import Submenu from './Submenu.js';
import ListePersonne from './ListePersonne.jsx';
import FormulairePersonnePage from './FormulairePersonnePage.jsx';
import FormulaireRecherchePersonne from './FormulaireRecherchePersonne.jsx';
import {Switch, Route} from 'react-router';


function Content() {
  const location = useSelector(state => state.location);
  // function renderContent() {
  //   switch (location) {
  //     case 'ACC': return <Home />;
  //     case 'INF': return <Info />;
  //     case 'PERS': return <Personne />;
  //     default: return <Page404 />;
  
  //   }
  //}
  return <> <Navbar />
            <Sidebar />
        {/*<Hero />
          <Bandeau/>
          <Menu/>
          */}
            <Submenu />
          <Switch>
            {
              /* 
              <Route exact path='/' render={()=><Home/>}/>
              <Route exact path='/informations' render={()=><Info/>}/>
              <Route exact path='/personnes' render={()=><ListePersonne/>}/>
              <Route path='/personnes/:id' render={()=><FormulairePersonnePage/>}/>
              <Route path='/formulaireRecherchePersonne' render={()=><FormulaireRecherchePersonne/>}/>
              <Route render={()=><Page404/>}/>
              **/
           }
            <Route exact path='/' render={()=><Home/>}/>
            <Route exact path='/informations' render={()=><Info/>}/>
            <Route exact path='/personnes' render={()=><ListePersonne/>}/>
            <Route path='/personnes/:id' render={()=><FormulairePersonnePage/>}/>
            <Route path='/formulaireRecherchePersonne' render={()=><FormulaireRecherchePersonne/>}/>
            <Route render={()=><Page404/>}/>
          </Switch>
  
  </> 
}
export default hot(Content);

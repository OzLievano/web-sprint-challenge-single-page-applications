import React from "react";
import {Switch, Route} from 'react-router-dom';
import Form from './Components/Form';
import Home from './Components/Home';
import NavBar from './Components/NavBar'
import Confirmation from './Components/Confirmation';

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/pizza-form" render={()=><Form/>}/>
        <Route exact path="/" render={()=><Home/>}/>
      </Switch>
    </div>
  );
};
export default App;

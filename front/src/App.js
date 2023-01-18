
import './App.css';
import Header from './components/Header';
import {Routes, Route} from "react-router"
import Home from './pages/Home';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';


function App() {
  return (
    <div className="App">
      
      <Header/>

      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/connexion"} element={<Connexion/>}/>
        <Route exact path={"/inscription"} element={<Inscription/>}/>
      </Routes>

    </div>
  );
}

export default App;

import React, { useState } from 'react'
import { useContext } from 'react'
import {Link} from "react-router-dom"
import { uidContext } from './uidContext'
import { useSelector} from "react-redux"
import { Squash as Hamburger} from "hamburger-react"
import Logout from './Logout'

/*
Le contexte permet de faire passer des données qu'on utilise
en global, comme l'user connecté
Il a pour intérêt de simplifier l'usage de données
qu'on utilise donc partout sur le site (thème graphique, langue, auth...)

Ici donc, on lui dit d'utiliser le contexte qu'il crée en uidcontext
et donc si il y a un contexte
il nous affiche une part du site, une autre sinon

De par son fonctionnement contextuel, 
redux filera les infos sur l'user par userReducer, 
mais il ne peut le faire, bien sur, que en cas d'user connecté
J'ai testé sur d'autres sites, uid est false de base, ça marche donc !
*/ 


export default function Header() {
  const [hamburger, setHamburger] = useState(false)
  const uid = useContext(uidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <div>
      <div>
        <h1>CheckEnterprise</h1>
      </div>
      
      <nav>
        <Link to={"/"}>Acceuil</Link>
        { uid ? (

          <>
            <Link to={"/user-profile/:id"}>
            <h5>Bienvenue {userData.name}</h5>
            </Link>

            <Logout/>
          </>
          
        ) : (
          <>
            <Link to={"/connexion"}>Connexion</Link>
            <Link to={"/inscription"}>Inscription</Link>
          </>
          
        )}
      </nav>

      <h2 className='flex m-3 sm:hidden' onClick={()=> setHamburger(!hamburger)}>
        <Hamburger/>
      </h2>

      {hamburger ? (
        <nav>
        <Link to={"/"}>Acceuil</Link>
        { uid ? (

          <>
            <Link to={"/user-profile/:id"}>
            <h5>Bienvenue {userData.name}</h5>
            </Link>

            <Logout/>
          </>
          
        ) : (
          <>
            <Link to={"/connexion"}>Connexion</Link>
            <Link to={"/inscription"}>Inscription</Link>
          </>
          
        )}
      </nav>
      ) : ""}
    </div>
  )
}

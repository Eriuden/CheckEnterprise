import React, {useState} from 'react'
import axios from 'axios'
import Connexion from './Connexion'

export default function Inscription() {
  const [ formSubmit, setFormSubmit] = useState(true)
  const [ name, setName] = useState("")
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [passwordControl, setPasswordControl] = useState("")

  const handleRegister = async(e) => {
    const terms = document.getElementById("terms")
    const nameError = document.querySelector(".name .error")
    const emailError = document.querySelector(".email .error")
    const passwordError = document.querySelector(".password .error")
    const passwordConfError = document.querySelector(".password-conf .error")
    const termsError = document.querySelector(".terms .error")
    passwordConfError.innerHTML =""
    termsError.innerHTML =""
  }
  return (
    <div>Inscription</div>
  )
}

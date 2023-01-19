import React, {useState} from 'react'
import axios from 'axios'
import Connexion from './Connexion'

export default function Inscription() {
  const [ formSubmit, setFormSubmit] = useState(false)
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

    if(password !== passwordConfError || !terms.checked) {
      if (password !== passwordControl){
        passwordConfError.innerHTML= "Les mots de passe ne correspondent pas"
      }

      if(!terms.checked){
        termsError.innerHTML= "Veuillez accepter les conditions générales"
      }
    } else {
      await axios({
        method:"post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          name,
          email,
          password
        }
      })
      .then((res)=> {
        if (res.data.errors) {
          nameError.innerHTML = res.data.errors.name 
          emailError.innerHTML = res.data.errors.email 
          passwordError.innerHTML = res.data.errors.password
        } else {
          setFormSubmit(true)
        }
      })
      .catch((err) => 
        window.alert(err)
      )
    }
  }


  return (
    <div>
      <>
        {formSubmit ? (
          <>
            <h4>Votre inscription s'est bien déroulée</h4>
          </>
        ) : (
          <form action='' onSubmit={handleRegister}>
            <label htmlFor='name'>Votre nom</label>
              <input type="text" id='name' name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
            <div className='name error'></div>

            <label htmlFor='email'>Votre Email</label>
              <input type="text" id='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <div className='email error'></div>

            <label htmlFor='password'>Votre mot de passe</label>
              <input type="tpassword" id='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <div className='password error'></div>

            <label htmlFor='password-conf'>Confirmer votre mot de passe</label>
              <input type="password" id='password-conf' name='password-conf' value={passwordControl} onChange={(e)=> setPasswordControl(e.target.value)}/>
            <div className='password-conf error'></div>

            <label htmlFor='terms'>J'accepte les <a href='/'>conditions d'utilisations</a> </label>
              <input type="checkbox" id='terms' />
            <div className='terms error'></div>
            
            <input type="submit" value="inscription"/> 
          </form>
        )}
      </>
    </div>
  )
}

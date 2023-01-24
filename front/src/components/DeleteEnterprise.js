import React from 'react'
import {useDispatch} from "react-redux"
import { deleteEnterprise } from '../redux/actions/enterprises.action'

export default function DeleteEnterprise(enterprise) {
  const dispatch = useDispatch()
  const deleteEnt = () => dispatch(deleteEnterprise(enterprise._id))

  return (
    <div onClick={()=> {
      if (window.confirm("Voulez vous supprimer cette fiche ?")){
        deleteEnt()
      }
    }}><p>Supprimer</p></div>
  )
}

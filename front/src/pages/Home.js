import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { getEnterprises } from '../redux/actions/enterprises.action'
import { isEmpty } from '../utils'
import EnterpriseCard from '../components/EnterpriseCard'


export default function Home() {
  const [loadEnterprises, setLoadEnterprises] = useState(false)
  const [count, setCount] = useState(10)
  const dispatch = useDispatch()
  const enterprisesData = useSelector((state) => state.enterprisesReducer)
  

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadEnterprises(true)
    }
  }

  useEffect(()=> {
    if (loadEnterprises) {
      dispatch(getEnterprises(count))
      setLoadEnterprises(false)
      setCount(count + 10)
    }

    window.addEventListener("scroll",loadMore)
    return () => window.removeEventListener("scroll", loadMore)
  }, [ loadEnterprises, dispatch, count])

  return (
    <div>
      <div>
          <ul>
            {!isEmpty(enterprisesData[0]) && 
            enterprisesData.map((enterprise) => {
              return <EnterpriseCard props={enterprise} key={enterprise._id}/>
            })}
          </ul>   
      </div>

    </div>
  )
}

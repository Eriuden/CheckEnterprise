import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils";


export default function EnterpriseCard({props}) {
  const [isLoading, setIsLoading] = useState(true)
  const enterprisesData = useSelector((state) => state.enterprisesReducer)
  const enterpriseData = useSelector((state) => state.enterpriseReducer)

  useEffect(()=> {
    !isEmpty(enterprisesData[0]) && setIsLoading(false)
  }, [enterprisesData])

  return (
    <li key={props._id}>
        {isLoading ? (
            <i className="fas-fa-spinner fa-spin"></i>
        ) : (
            <>
                <div>
                    <h2>
                        {isEmpty(enterprisesData[0]) &&
                        enterprisesData
                        .map((enterprise) => {
                            if (enterprise._id) 
                            return enterprise.name
                            else return null
                        })
                        .join("")}
                    </h2>
                    
                    <h3>
                        {!isEmpty(enterprisesData[0]) &&
                        enterprisesData
                        .map((enterprise) => {
                            if (enterprise._id) return enterprise.socialSiege
                            else return null
                        })}
                    </h3>

                    <h3>
                        {!isEmpty(enterprisesData[0]) &&
                        enterprisesData
                        .map((enterprise) => {
                            if (enterprise._id) return enterprise.capital
                            else return null
                        })}
                    </h3>
                    
                </div>
            </>
        )}
    </li>
  )
}

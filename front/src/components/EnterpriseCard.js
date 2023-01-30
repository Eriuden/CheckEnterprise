import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEnterprise } from "../redux/actions/enterprises.action";
import { isEmpty } from "../utils";
import DeleteEnterprise from "./DeleteEnterprise";
import LikeDislikeButtons from "./LikeDislikeButtons";
import Comment from "./comment/comment";


export default function EnterpriseCard({enterprise}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = enterpriseData(null)
  const enterprisesData = useSelector((state) => state.enterprisesReducer)
  const enterpriseData = useSelector((state)=> state.userReducer)
  const userData = useSelector((state)=> state.userReducer)
  const [showComments, setShowComments] = userData(false);
  const dispatch = useDispatch()

  const updateItem = () => {
    if (textUpdate) {
        dispatch(updateEnterprise(enterprise._id, textUpdate))
    }
    setIsUpdated(false)
  }
  useEffect(()=> {
    !isEmpty(enterprisesData[0]) && setIsLoading(false)
  }, [enterprisesData])

  return (
    <li key={enterprise._id}>
        {isLoading ? (
            <i className="fas-fa-spinner fa-spin"></i>
        ) : (
            <>
                <div>

                    {isUpdated === false && 
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
                    }
                    
                    
                    {isUpdated === false &&
                        <h3>
                        {!isEmpty(enterprisesData[0]) &&
                        enterprisesData
                        .map((enterprise) => {
                            if (enterprise._id) return enterprise.socialSiege
                            else return null
                        })}
                        </h3>
                    }
                    
                    
                    {isUpdated === false &&
                        <h3>
                        {!isEmpty(enterprisesData[0]) &&
                        enterprisesData
                        .map((enterprise) => {
                            if (enterprise._id) return enterprise.capital
                            else return null
                        })}
                        </h3>
                    }
        
                    
                    {isUpdated === false && <p>{enterprise.description}</p>}
                    {isUpdated && (
                        <div>
                            <textarea defaultValue={post.message}
                            onChange={(e)=> setTextUpdate(e.target.value)}
                            />
                            <div>
                                <button onClick={updateItem}>
                                    Valider les modifications
                                </button>
                            </div>
                        </div>
                    )}

                    {
                        userData._id === enterprise.posterId && (
                            <div>
                                <DeleteEnterprise enterprise={enterprise}/>
                            </div>
                        )
                    }

                    <div>
                    <img
                        onClick={() => setShowComments(!showComments)}
                        src="./img/icons/message1.svg"
                        alt="comment"
                        />
                        <span>{enterpriseData.comments.length}</span>
                    </div>

                    <LikeDislikeButtons enterprise = {enterprise}/>
                    {showComments && <Comment enterprise={enterprise} />}
                </div>
            </>
        )}
    </li>
  )
}

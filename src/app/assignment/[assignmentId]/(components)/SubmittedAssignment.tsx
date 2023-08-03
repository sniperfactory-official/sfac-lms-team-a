import { useGetUser } from '@/hooks/reactQuery/assignment/useGetDetailAssignment'
import React from 'react'

type Props = {
  id:string,
  setFeedId: () => void,
  k: string,
  setDocumentId: () => void,
  setModal: () => void,
  setUserda: () => void,
}

const SubmittedAssignment = ({id,setFeedId,k,setDocumentId,setModal,setUserda}) => {
  const {data,isLoading, error} = useGetUser(id)

  return (
    <div className="w-[700px] border cursor-pointer" onClick={() => {
      setFeedId(id)
      setDocumentId(k)
      setModal(prev => !prev)
      setUserda(data)
    }}>
      <span>{data?.username}</span>
      <span>{data?.role}</span>
      
    </div>
  )
}

export default SubmittedAssignment
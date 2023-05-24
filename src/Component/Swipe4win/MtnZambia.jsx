import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Header } from '../../CommonComponent'

function MtnZambia() {
  const navigate=useNavigate()

  return (
    <div className=''>
      <Header />
      <div className='flex justify-center'>
        <Card item={"Single Question"} style={{ backgroundColor: 'red' }} handleClick={()=>navigate("/swipe4win/SingleQuestion",{state:"Zambia"})} />
        <Card item={"Multi Question"} style={{ backgroundColor: 'green' }} handleClick={()=>navigate("/swipe4win/MultiQuestion",{state:"Zambia"})} />
        <Card item={"View Entity"} style={{ backgroundColor: 'Purple' }} handleClick={()=>navigate("/swipe4win/ViewEntity",{state:"Zambia"})} />
        <Card item={"View Result"} style={{ backgroundColor: 'orange' }} handleClick={()=>navigate("/swipe4win/ViewResult",{state:"Zambia"})} />
      </div>
    </div>
  )
}

export default MtnZambia
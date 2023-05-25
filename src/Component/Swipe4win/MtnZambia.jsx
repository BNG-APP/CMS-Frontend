import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Header } from '../../CommonComponent'

function MtnZambia() {
  const navigate=useNavigate()

  return (
    <div className=''>
      <Header />
      <div className='flex justify-center mt-20'>
        <Card item={"Single Question"} style={{ backgroundColor: 'red' }} handleClick={()=>navigate("/swipe4win/SingleQuestion",{state:"zainlibyana_libya"})} />
        <Card item={"Multi Question"} style={{ backgroundColor: 'green' }} handleClick={()=>navigate("/swipe4win/MultiQuestion",{state:"zainlibyana_libya"})} />
        <Card item={"View Entity"} style={{ backgroundColor: 'Purple' }} handleClick={()=>navigate("/swipe4win/ViewEntity",{state:"zainlibyana_libya"})} />
        <Card item={"View Result"} style={{ backgroundColor: 'orange' }} handleClick={()=>navigate("/swipe4win/ViewResult",{state:"zainlibyana_libya"})} />
      </div>
    </div>
  )
}

export default MtnZambia
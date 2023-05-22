import React from 'react'
import { Header } from '../../CommonComponent'

function MtnZambia() {

  return (
    <div className=''>
      <Header />
      <div className='flex justify-center'>
        <h1 className='text-xl font-semibold text-black'>MtnZambia</h1>
        <div className='bg-white p-4 text-black m-2'>Single question</div>
        <div className='bg-white p-4 text-black m-2'>Multi question</div>
        <div className='bg-white p-4 text-black m-2'>View Entity</div>
        <div className='bg-white p-4 text-black m-2'>View Result</div>
      </div>
    </div>
  )
}

export default MtnZambia
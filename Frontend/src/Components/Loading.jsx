import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-[#212121]'>
      <div className='w-16 h-16 border-4 border-solid border-blue-600 rounded-full border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading
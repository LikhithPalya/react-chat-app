import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='sidebar'>
      <Navbar />
      <Searchbar />
      <Chats />
    </div>
    
  )
}

export default Sidebar
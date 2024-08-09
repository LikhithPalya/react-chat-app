import React, {useContext} from 'react'
import Add from '../img/add.gif'
import Cam from '../img/cam.gif'
import More from '../img/more.gif'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext' 
function Chat() {
  const {data} = useContext(ChatContext)
  // console.log(Object.entries(data));
  console.log(data);


  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />


        </div>
        
      </div>
      <Messages />

      <Input/>
    </div>
  )
}

export default Chat
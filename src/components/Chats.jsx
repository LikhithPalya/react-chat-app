import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
function Chats() {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      if (currentUser?.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          // Check if doc.data() returns an object
          // const data =  || {};
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
      }
    }
    currentUser.uid && getChats()
  }, [currentUser?.uid]);
  console.log(Object.entries(chats));
  console.log(chats);

  const handleSelect = (u)=>{
    dispatch({type: "CHANGE_USER", payload: u})
  }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=> b[1].date-a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userinfo)}>
          <img src={chat[1].userinfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userinfo.displayName}</span>
            {/* <p>{chat[1].lastMessage.text}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;

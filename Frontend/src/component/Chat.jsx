import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";


function Chat() {

    const user = useParams();
    console.log("userId in chat->", user.userId);
    const loginUser = useSelector((store) => store?.userReducer?.user);
    console.log("loginUser in chat->", loginUser?._id);

    const [messages,setMessages] = useState([]);
    console.log("messages in chat->", messages);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => 
      {
        const socket = createSocketConnection();
        socket.emit('sendMessages', { loginUserId: loginUser?._id, userId: user?.userId,text: newMessage });
      }


    useEffect(() => 
      {
           const socket = createSocketConnection();
           socket.emit("joinChat", { loginUserId: loginUser?._id, userId: user?.userId });

           socket.on("receiveMessage", ({ loginUserId, userId, text }) =>
             {
               console.log("Received message:", text);
               setMessages((prevMessages) => [...prevMessages, { loginUserId, userId, text }]);
             })
      },[loginUser,user])

  return (
    <div>
      <div className="card w-96 bg-base-100 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
          <p>
            {
              messages.map((message, index) => (
                <div key={index} className={`message ${message.loginUserId === loginUser?._id ? 'sent' : 'received'}`}>
                  <strong>{message.loginUserId === loginUser?._id ? 'You' : user.firstName + " " + user.lastName}:</strong> {message.text}
                </div>
              ))
            }
          </p>
          <div className="justify-end card-actions">
            <input
              type="text"
              placeholder="Xlarge"
              className="input input-xl"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

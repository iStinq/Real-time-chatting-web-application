import "../Styles/Chat.css";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const Chat = (props) => {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const messageCollectionRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") {
            return
        }
        await addDoc(messageCollectionRef, {
            text : newMessage,
            createdAt : serverTimestamp(),
            user : auth.currentUser.displayName,
            room,//or room : room
        });

        setNewMessage("");
    }

    useEffect(() => {
        const queryMessages = query(messageCollectionRef, where("room", "==", room), orderBy("createdAt"));
        const unsuscribe =  onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id : doc.id});
            });
            setMessages(messages);
        });

        return () => unsuscribe();//to clean up useEffect
    }, []);

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => {
                    return (
                        <div className="message" key={message.id}>
                            <span className="user">{message.user}</span> : <span></span>
                            {message.text}
                        </div>
                    )
                })}
            </div>
            <br />
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input type="text" className="new-message-input" placeholder="Type your message here..." 
                onChange={(event) => setNewMessage(event.target.value)} 
                value={newMessage} />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    )
}
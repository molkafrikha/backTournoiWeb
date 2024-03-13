import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { socket } from "../../App"
import { useAppSelector } from "../../app/hooks"
import Spinner from "../../utils/Spinner/Spinner"
import { useGetMessagesQuery } from "./MessagesSlice"

const Messages = () => {
    const currentUser = useAppSelector(state => state.auth.user)
    const { id } = useParams();
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<string[]>([])
    const keyUpHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            socket.emit("message", { message: message, senderId: currentUser.user.id, recieverId: id })
            setMessages([...messages, message])
            setMessage("")
        }
    }
    const { data, isLoading, error, isError } = useGetMessagesQuery(id);
    if (isError) {
        return <div>error</div>
    }
    const content = data?.messages?.map((message: any) => {
        return (<span className="w-1/2 flex justify-around items-center bg-black p-1 mt-1 rounded-full">{message.text}  <span>
            {message.createdAt}</span> </span>)
    })

    return (
        <section className="form">
            <div className="bg-neutral-600 w-full flex flex-col p-3 h-72 overflow-scroll">
                {isLoading ? <Spinner /> : content}
                {messages.map(message => {
                    return (<span className="w-1/2 flex justify-around items-center bg-black p-1 mt-1 rounded-full">{message}
                    </span>)
                })}
            </div>
            <input onChange={e => setMessage(e.target.value)} value={message} onKeyUp={keyUpHandler} type="text" placeholder="write your message..." className="input" />

        </section>
    )
}

export default Messages
import { Link } from "react-router-dom";
import Spinner from "../../../utils/Spinner/Spinner";
import { useGetConversationsQuery } from "../MessagesSlice"

const Conversations = () => {
    const { data, isLoading, error, isError } = useGetConversationsQuery();
    console.log(data);
    const conversations = data?.conversations.map(conversation => {
        return (<Link to={`/messages/${conversation.recieverId}`} className="p-2 bg-orange-600 whitespace-nowrap " key={conversation.id} >
            {conversation.user.name}
        </Link >)
    })
    return (
        <section className="flex w-full items-center justify-around md:flex-col md:w-1/3 md:h-screen bg-neutral-900 h-14">
            {isLoading ? <Spinner /> : conversations}
        </section>
    )
}

export default Conversations
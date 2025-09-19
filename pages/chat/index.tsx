import ChatContainer from "@/components/ui/chat/ChatContainer"
import Head from "next/head"

const ChatPage = () => {
    return (
        <div>
            <Head>
                <title>PlanPro | Chat</title>
                <link rel="icon" href="/asset/planpro-favicon.svg" />
            </Head>
            <main>
                <ChatContainer />
            </main>
        </div>
    )
}


export default ChatPage

import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from "../components/ChatContainer"

const Homepage = () => {
    const { selectedUser } = useChatStore();

    return (

        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900'>
            <div className='flex items-center justify-center pt-20 px-4'>
                <div className='bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-blue-500/20'>
                    <div className='flex h-full rounded-2xl overflow-hidden'>
                        <Sidebar/>
                        {!selectedUser ? <NoChatSelected/> : <ChatContainer />}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Homepage

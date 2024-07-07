"use client"

import { useChatStore } from "@/stores/chatStore"
import { Chat } from "../Chat"
import Image from "next/image"
import HomeSectionBg from "@/assets/home-section-bg.svg"
import { Button } from "../ui/button"
import { Lock } from "lucide-react"

export const HomePage = () => {
    const { chat, setShowNewChat } = useChatStore()

    return (
        <div className="h-app">
            {chat ?
                <Chat />
                :
                <div className="flex flex-col items-center gap-12 py-8 h-full px-4">
                    <div className="flex flex-col items-center justify-center gap-12 flex-1">
                        <Image
                            src={HomeSectionBg}
                            alt="Home Section"
                            width={440}
                            priority
                        />

                        <p className="text-xl max-w-xl text-center font-bold text-slate-600 dark:text-slate-300">
                            Por favor, selecione uma conversa para visualizar as
                            mensagens ou inicie um novo chat.
                        </p>

                        <Button
                            className="rounded-full"
                            onClick={() => setShowNewChat(true)}
                        >
                            Nova Conversa
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <Lock className="size-4" strokeWidth={3} />
                        Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta.
                    </div>
                </div>
            }
        </div>
    )
}
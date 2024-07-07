import { Attachment } from "./Attachment"
import { User } from "./User"

export type Message = {
    id: number,
    body: string | null,
    attachment: Attachment | null,
    from_user: User,
    viewed_at: string | null,
    created_at: string
}

export type APIGetMessages = {
    messages: Message[]
}

export type APICreateMessage = {
    message: Message
}

export type APIDeleteMessage = {
    success: boolean
}

export type UpdateMessageEvent = {
    type: "create" | "delete",
    message?: Message,
    query: {
        chat_id: number,
        message_id?: number
    }
}

export type MarkMessageAsSeenEvent = {
    query: {
        chat_id: number,
        exclude_user_id: number
    }
}
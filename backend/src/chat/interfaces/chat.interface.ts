
export interface ChatResponse {
    id: string,
    profileAvatar : string | null,
    name : string,
    lastMessage : string | null,
    lastMessageTime : string | null,
    unreadCount : number
}
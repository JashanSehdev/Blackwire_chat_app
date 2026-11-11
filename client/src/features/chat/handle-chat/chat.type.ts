import { GroupInput } from "@/app/(navbar-required)/messages/create-chat/create-group/create-group.type";

export interface createPrivateChat {
    memberId : number,
}
export interface createGroupRequest  extends Omit<GroupInput, "members"> {
    memberId : number[]
}
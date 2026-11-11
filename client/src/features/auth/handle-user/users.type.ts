import { EditUserInput } from "@/components/admin/users/edit-user/edit-user-form/edit-user-form.type";

export interface ChangeAccess {
    userId: number,
    block : boolean
}

export interface EditUserByAdmin extends EditUserInput {
    userId : number
}

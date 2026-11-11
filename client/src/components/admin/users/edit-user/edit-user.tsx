import { Card, CardContent, CardHeader } from "@mui/material";
import AlertBox from "../../alert/alertBox";
import EditUserForm from "./edit-user-form/edit-user-form";
import EditIcon from "@mui/icons-material/Edit";
import { AdminUser } from "@/type/user.type";
import { RoleEnum, StatusEnum } from "@/enum/user.enum";

type EditUserProp = {
  open: boolean;
  handleClose: () => void;
  user: AdminUser | null;
  editUserbyAdmin : (userId: number, editUser: {
    status: StatusEnum;
    role: RoleEnum;
}) => Promise<void>
};
export default function EditUser({ open, handleClose, user, editUserbyAdmin }: EditUserProp) {
  return (
    <AlertBox open={open} handleClose={handleClose}>
      <Card sx={{ minWidth: "300px" }}>
        <CardHeader
          avatar={<EditIcon />}
          title="Edit"
          subheader="Edit the User"
        />
        <CardContent>
          {user && <EditUserForm editUserbyAdmin={editUserbyAdmin} user={user} />}
        </CardContent>
      </Card>
    </AlertBox>
  );
}

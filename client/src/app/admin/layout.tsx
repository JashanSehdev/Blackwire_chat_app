'use client'
import AdminSidebar from "@/components/admin/admin-sidebar/admin-sidebar";
import { useAppSelector } from "@/features/store";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const user = useAppSelector((state) => state.auth.user)
  if(user?.role !== 'admin') {
    router.replace("/")
  }
  return (
    <div>
        <aside>
            <AdminSidebar />
        </aside>
        <Box sx={{marginLeft: {
          md: '250px'
        }}}>
            {children}
        </Box>
    </div>
  )
}

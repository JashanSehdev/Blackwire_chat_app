
import Sidebar from "@/components/sidebar/side-bar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
        <aside>
            <Sidebar />
        </aside>
        <Box sx={{marginLeft: {
          md: '240px'
        }}}>
            {children}
        </Box>
    </div>
  )
}

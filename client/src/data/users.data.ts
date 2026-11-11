import { AdminUser } from "@/type/user.type";

export const users: AdminUser[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    role: "USER",
    status: "ACTIVE",
    avatar: "https://i.pravatar.cc/150?img=12",
    createdAt: "2026-11-02",
  },
  {
    id: 2,
    username: "sarah_smith",
    email: "sarah@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    avatar: "https://i.pravatar.cc/150?img=47",
    createdAt: "2026-11-01",
  },
  {
    id: 3,
    username: "mike_johnson",
    email: "mike@example.com",
    role: "USER",
    status: "BLOCKED",
    avatar: "https://i.pravatar.cc/150?img=11",
    createdAt: "2026-10-28",
  },
];
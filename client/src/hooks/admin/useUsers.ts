"use client";

import { EditUserInput } from "@/components/admin/users/edit-user/edit-user-form/edit-user-form.type";
import { FilterInput } from "@/components/admin/users/user-toolbar/user-toolbar.type";
import {
  changeAccessAsync,
  EditUserByAdminAsync,
  fetchUsersAsync,
} from "@/features/auth/handle-user/users.action";
import { useAppDispatch } from "@/features/store";
import { AdminUser } from "@/type/user.type";
import { useEffect, useState } from "react";

export default function useUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [filters, setFilters] = useState<FilterInput>({});

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleFiltersChange = (data: FilterInput) => {
    setPage(1);
    setFilters(data);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const response = await dispatch(
          fetchUsersAsync({ page, limit, ...filters }),
        ).unwrap();

        if (isMounted) {
          setUsers(response.data);
          setTotalPages(response.meta.totalPages);
          setTotalUsers(response.meta.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [dispatch, limit, page, filters]);

  const changeAccess = async (userId: number, action: boolean) => {
    const result = await dispatch(
      changeAccessAsync({ userId, block: action }),
    ).unwrap();

    setUsers((prev) =>
      prev.map((item) => {
        return item.id === result.id ? result : item;
      }),
    );
  };

  const editUserbyAdmin = async (userId: number, editUser : EditUserInput) => {
    const result = await dispatch(
      EditUserByAdminAsync({ userId, ...editUser}),
    ).unwrap(); 

    setUsers((prev) =>
      prev.map((item) => {
        return item.id === result.id ? result : item;
      }),
    );
  }

  return {
    users,
    loading,
    page,
    setPage,
    limit,
    totalPages,
    handleFiltersChange,
    changeAccess,
    editUserbyAdmin
  };
}

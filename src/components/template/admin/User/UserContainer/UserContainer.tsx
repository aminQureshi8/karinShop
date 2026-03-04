"use client";

import { useCallback, useState } from "react";
import UserTable from "../Table/UserTable";

export default function UserContainer({
  users,
  totalPages,
}: {
  users: any;
  totalPages: number;
}) {
  const [userState, setUserState] = useState([...users]);
  const [totalPageState, setTotalPageState] = useState(totalPages);
  const [intialUsers, setintialUsers] = useState([...users]);
  const getUser = useCallback(async (page: number) => {
    try {
      const res = await fetch(`/api/admin/user?page=${page}`);
      const data = await res.json();
      setUserState(data.users);
      setTotalPageState(data.totalPages);
    } catch (error) {}
  }, []);

  return (
    <div>
      <UserTable
        users={userState}
        getUser={getUser}
        totalPageState={totalPageState}
        intialUsers={intialUsers}
        setUserState={setUserState}
      />
    </div>
  );
}

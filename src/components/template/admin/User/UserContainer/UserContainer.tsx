"use client";

import { useState } from "react";
import UserTable from "../Table/UserTable";

export default function UserContainer({ users }: { users: any }) {
  const [userState, setUserState] = useState([...users]);
  const [totalPageState, setTotalPageState] = useState(0);
  const getUser = async (page: number) => {
    try {
      const res = await fetch(`/api/admin/user?page=${page}`);
      const data = await res.json();
      setUserState(data.users);
    } catch (error) {}
  };

  return (
    <div>
      <UserTable users={userState} getUser={getUser} />
    </div>
  );
}

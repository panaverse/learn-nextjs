import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeUser } from "../store/usersSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.reducer.users );

  return (
    <div style={{marginTop: "10px"}}>
      <div>User List:</div>
      <ol>
        {users.map((user) => (
          <div>{user} <button onClick={() => dispatch(removeUser(user))}> x </button>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default Users;
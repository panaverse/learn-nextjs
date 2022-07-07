import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";

const Users = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const addNewUser = () => {
    if (name) {
      dispatch(addUser(name));
      setName("");
    }

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>Add or Remove a user</div>
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={addNewUser}>Add</button>
    </div>
  )
}

export default Users
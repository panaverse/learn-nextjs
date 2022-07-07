import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";

const users = () => {
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
    <div>
      <div style={{ marginTop: "20px" }}>
        All state changes are happening on <b>Client Side</b>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div>Add or Remove a user</div>
        <input type="text" value={name} onChange={handleChange} />
        <button onClick={addNewUser}>Add</button>
      </div>

    </div>
  )
}

export default users
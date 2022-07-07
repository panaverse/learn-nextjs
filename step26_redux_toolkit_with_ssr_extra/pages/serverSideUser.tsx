import { addUser } from "../store/usersSlice";
import { wrapper } from "../store/store";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(addUser("Added from Server side"))
    return {props:{}} 
  }
)

const Other: NextPage = (props) => {
  return (
    <div style={{ marginTop: "20px" }}>
      All state changes are happening on <b>Server Side</b>
    </div>
  );
};

export default Other;
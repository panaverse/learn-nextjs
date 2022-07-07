
import { incrementByAmuont } from "../store/counterSlice";
import { wrapper } from "../store/store";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(incrementByAmuont(1))
    return {props:{}} 
  }
);


const Other: NextPage = (props) => {
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        All state changes are happening on <b>Server Side</b>
      </div>
    </div>
  );
};

export default Other;
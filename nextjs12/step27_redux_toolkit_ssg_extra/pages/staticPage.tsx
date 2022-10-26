import { incrementByAmuont } from "../store/counterSlice";
import { wrapper } from "../store/store";
import { GetStaticProps, NextPage } from "next";
import { addUser } from "../store/usersSlice";


export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => () => {
    console.log('Redux state updating on build time');
    store.dispatch(incrementByAmuont(1))
    store.dispatch(addUser("SSG is so cool"))
    return { props: {} }
});


const StaticPage = () => {
    return (
        <div style={{ marginTop: "20px" }}>
            This state is being updated through SSG
        </div>)
}

export default StaticPage


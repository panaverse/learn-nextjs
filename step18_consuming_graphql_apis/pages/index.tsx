import { useQuery } from "@apollo/client";
import Link from "next/link";
import Sign from "../components/Sign";
import GET_LATEST_SIGNS from '../lib/apollo/queries/getLatestSigns'

export interface Sign {
  content: string;
  country: string;
  created_at: string;
  nickname: string;
  uuid: string;
}

interface Signs {
  sign: Sign[]
}

const HomePage = () => {

  const { loading, data } = useQuery<Signs>(GET_LATEST_SIGNS, {
    fetchPolicy: 'no-cache',
  });

  console.log("data ", data);

  if (loading) {
    return <div>Loading . . .</div>
  }
  
  return (
    <div>
      <div> Rendered at Client Side</div>
      <br /> <br />

      <Link href="/new-sign" passHref>
        <a> Add new sign</a>
      </Link>

      <br /> <br />

      <div> List of Signatures</div>
      <br />

      {
        data && data.sign.map((sign, index) => (
          <Sign {...sign} key={index} />
        ))
      }
    </div>
  )

}
export default HomePage
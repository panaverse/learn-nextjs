import Link from 'next/link';

export default function Home() {
  return (
    <div>
          Hello World from Panaverse DAO!
          <br/>
          <Link href="/zia">Go to Zia page</Link>
          <br/>
          <Link href="/zeeshan">Go to Zeeshan page</Link>
          <br/>
          <Link href="/hira">Go to Hira page</Link>
    </div>
  )
}

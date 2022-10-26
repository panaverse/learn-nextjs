import Link from 'next/link';
import { useContext } from 'react';
import cartContext from '../components/context/cartContext';


function Navbar() {
  const { items } = useContext(cartContext);
  const totalItemsAmount = Object.values(items).reduce((x, y) => x + y.count!, 0);


  return (
    <div style={{borderBottom: "1px solid #808080", display: "flex", justifyContent: "space-between", padding: "20px"}}>
      <div>
        <Link href="/" passHref>
          <a> My e-commerce </a>
        </Link>
      </div>
      <div>
        <Link href="/cart" passHref>
          <a>{totalItemsAmount} items in cart</a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
import ProductCard from '../components/ProductCard';
import {products} from '../data/items';

const Home = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default Home;
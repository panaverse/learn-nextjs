import { useContext } from 'react';
import cartContext from '../components/context/cartContext';
import { products } from '../data/items';

const getFullItem = (id: string) => {
    const idx = products.findIndex((item) => item.id === id);
    return products[idx];
}

const Cart = () => {
    const { items } = useContext(cartContext);
    const total = Object.keys(items)
        .map((id) => getFullItem(id).price * items[id].count!)
        .reduce((x, y) => x + y, 0);

    const amounts = Object.keys(items).map((id) => {
        const item = getFullItem(id);
        return { item, amount: items[id].count };
    });

    return (
        <div>
            <h1 className="text-xl font-bold"> Total: ${total} </h1>
            <div>
                {amounts.map(({ item, amount }) => (
                    <div key={item.id}>
                        x{amount} {item.name} (${amount! * item.price})
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
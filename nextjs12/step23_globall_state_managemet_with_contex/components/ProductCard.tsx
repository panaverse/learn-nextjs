import { useContext } from 'react';
import cartContext from '../components/context/cartContext';
import { Item, ItemsState } from './context/types';


const ProductCard = ({ id, name, price, picture }: Item) => {

    const { items, setItems } = useContext<ItemsState>(cartContext);
    const productAmount = id in items ? items[id].count : 0;

    const handleAmount = (action: "increment" | "decrement") => {
        if (action === 'increment') {
            const newItemAmount = id in items ? items[id].count! + 1 : 1;
            setItems({ ...items, [id]: { ...items[id], count: newItemAmount } });
        }
        if (action === 'decrement') {
            if (items?.[id].count! > 0) {
                setItems({ ...items, [id]: { ...items[id], count: items[id].count! - 1 } });
            }
        }
    };

    return (
        <div>
            <div >
                <img src={picture} alt={name} className="object-cover" />
            </div>
            
            <div>
                <div> {name} </div>
                <div> ${price} per kg </div>
            </div>

            <div style={{display: "flex", justifyContent: "space-evenly" , border: "1px solid #808080", marginTop: "10px" }}>
                <button
                    disabled={productAmount === 0}
                    onClick={() => handleAmount('decrement')}>
                    -
                </button>
                <div>{productAmount}</div>
                <button
                    onClick={() => handleAmount('increment')}>
                    +
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
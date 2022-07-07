import { createContext } from 'react';
import { ItemsState } from './types';

const ShoppingCartContext = createContext<ItemsState>({
    items: {},
    setItems: () => null,
});

export default ShoppingCartContext;
import { Dispatch, SetStateAction } from "react";

export interface Item {
    id: string;
    name: string;
    picture: string;
    price: number,
    count?: number

}

export interface ItemsState {
    items: {[item: string]: Item},
    setItems: Dispatch<SetStateAction<{[item: string]: Item}>>
}
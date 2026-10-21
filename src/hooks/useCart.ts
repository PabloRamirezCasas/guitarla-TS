import { useEffect, useState, useMemo } from "react";
import {db} from '../data/db'
import type { Guitar, CartItem } from "../types"

export default function useCart()  {
   
    function initialCart() : CartItem []{
        const localStorageCart = localStorage.getItem(('cart'));
        return localStorageCart? JSON.parse(localStorageCart): []
    }
    const [database] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

   
    useEffect( () => {
        localStorage.setItem( 'cart', JSON.stringify(cart))
    }, [cart])


    function increaseQuantity (id : Guitar['id']) {
        const updatedCart = cart.map( guitar => {
            if(guitar.id === id && guitar.quantity < MAX_ITEMS){
               return {
                    ...guitar,
                    quantity: guitar.quantity + 1
               }
             
            } 
            return guitar
        })
        setCart(updatedCart);
    }

    function decreaseQuantity(id : Guitar ['id'])  {
        const updatedCart = cart.map( guitar =>{
            if(guitar.id === id && guitar.quantity > MIN_ITEMS){
                return{
                    ...guitar,
                    quantity: guitar.quantity - 1
                }
            }
            return guitar
        })
        setCart(updatedCart);
    }

    function removeFromCart(id : Guitar ['id']) {

        setCart( prevCart => prevCart.filter ( guitar => guitar.id !== id))
    }

    function addToCart(item : Guitar) {
        //prevCart vendría a ser el estado actual de nuestro state 'cart' (El array de elementos del carrito)
        const itemExist = cart.findIndex( guitar => guitar.id === item.id);
        if(itemExist === -1) {
            const newItem : CartItem = {... item, quantity : 1}
            setCart( [...cart, newItem] )
        }else {
            //Evitamos que la cantidad de elementos en el carrito sea mayor a 5
            if(cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart);
        }
    }

    function clearCart () {
        setCart([])
    }

    const isEmpty = useMemo( () => cart.length === 0 , [cart]) 
    const cartTotal =useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0),[cart])
    return {
 
        database,
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToCart,
        clearCart,
        isEmpty,
        cartTotal

    }
}
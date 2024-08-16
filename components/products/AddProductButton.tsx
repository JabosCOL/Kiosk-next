"use client"

import { addToOrder } from "@/src/redux/order/orderSlice"
import { Product } from "@prisma/client"
import { useDispatch } from "react-redux"

export type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product } : AddProductButtonProps) {
    const dispatch = useDispatch()

    return (
        <button
            type="button"
            onClick={() => dispatch(addToOrder(product))}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 rounded-lg uppercase font-bold cursor-pointer"
        >
            add
        </button>
    )
}

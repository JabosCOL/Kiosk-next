import { OrderItem } from "@/src/types"
import { Product } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface OrderState {
    order: OrderItem[]
    MAX_ITEMS: number
}

const initialState: OrderState = {
    order: [],
    MAX_ITEMS: 5
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addToOrder: (state, action: PayloadAction<Product>) => {
            const sameOrderItem = state.order.find(order => order.id === action.payload.id)

            if (sameOrderItem) {
                if (sameOrderItem.quantity >= state.MAX_ITEMS) {
                    return
                }
                const updatedOrder = state.order.map(orderItem =>
                    orderItem.id === sameOrderItem.id ? { ...orderItem, quantity: orderItem.quantity + 1, subtotal: orderItem.price * (orderItem.quantity + 1) } : orderItem
                )
                state.order = updatedOrder
            } else {
                const { categoryId, image, ...data } = action.payload
                const orderItem = {
                    ...data,
                    quantity: 1,
                    subtotal: 1 * data.price
                }
                state.order = [...state.order, orderItem]
            }
        },
        removeOrderItem: (state, action: PayloadAction<Product['id']>) => {
            state.order = state.order.filter(orderItem => orderItem.id !== action.payload)
        },
        incrementQuantity: (state, action: PayloadAction<Product['id']>) => {
            const updatedOrder = state.order.map(orderItem =>
                orderItem.id === action.payload ?
                    {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                        subtotal: orderItem.price * (orderItem.quantity + 1)
                    }
                    : orderItem

            )

            state.order = updatedOrder
        },
        decrementQuantity: (state, action: PayloadAction<Product['id']>) => {
            const updatedOrder = state.order.map(orderItem =>
                orderItem.id === action.payload ?
                    {
                        ...orderItem,
                        quantity: orderItem.quantity - 1,
                        subtotal: orderItem.price * (orderItem.quantity - 1)
                    }
                :  orderItem
            )

            state.order = updatedOrder
        },
        clearOrder: (state) => {
            state.order = []
        }
    }
})

export const { addToOrder, removeOrderItem, incrementQuantity, decrementQuantity, clearOrder } = orderSlice.actions
export default orderSlice.reducer
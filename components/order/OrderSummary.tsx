"use client"

import { useMemo } from "react"
import { RootState } from "@/src/redux/store"
import { useDispatch, useSelector } from "react-redux"
import OrderItemDisplay from "./OrderItemDisplay"
import { formatCurrency } from "@/src/utils"
import { createOrderAction } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schemas"
import { toast } from "react-toastify"
import { clearOrder } from "@/src/redux/order/orderSlice"

export default function OrderSummary() {
    const order = useSelector((state: RootState) => state.order.order)
    const dispatch = useDispatch()
    const total = useMemo(() => order.reduce((total, order) => total + (order.price * order.quantity), 0), [order])

    const handleFormAction = async (formData : FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            orderProducts: order
        }

        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue =>
                toast.error(issue.message)
            )
            return
        }

        const response = await createOrderAction(data)
        if (response?.errors) {
            response.errors.forEach(error =>
                toast.error(error.message)
            )
            return
        }

        toast.success('The order has been sent!')
        dispatch(clearOrder())
    }

    return (
        <aside className="relative lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96">
            <h1 className=" bg-gray-200 text-4xl text-center font-black py-5">My Order</h1>

            <div className="p-5">
                {order.length === 0 ? <p className="text-center my-10">Order is currently empty</p>
                    : order.map(orderItem =>
                        <OrderItemDisplay
                            key={orderItem.id}
                            orderItem={orderItem}
                        />
                    )
                }
            </div>
            {total ?
                <div className="sticky bottom-0 bg-white p-5 border-t-2 border-gray-700">
                    <p className="text-xl text-center font-black uppercase text-gray-700">
                        Total: {''}
                        <span className="font-normal">{formatCurrency(total)}</span>
                    </p>
                    <form
                        action={handleFormAction}
                        className="w-full mt-5 space-y-5"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="w-full p-2 rounded-lg border-2 border-gray-400"
                        />
                        <input
                            type="submit"
                            value="Confirm Order"
                            className="py-2 rounded-lg uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
                        />
                    </form>
                </div> : ''
            }
        </aside>
    )
}
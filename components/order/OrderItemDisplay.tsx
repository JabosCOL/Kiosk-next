import { decrementQuantity, removeOrderItem, incrementQuantity } from "@/src/redux/order/orderSlice"
import { RootState } from "@/src/redux/store"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

type OrderItemDisplayProps = {
    orderItem: OrderItem
}

export default function OrderItemDisplay({ orderItem } : OrderItemDisplayProps) {
    const dispatch = useDispatch()
    const MAX_ITEMS = useSelector((state: RootState) => state.order.MAX_ITEMS)
    const MIN_ITEMS = 1

    return (
        <div className="shadow space-y-1 p-4 mt-5 rounded-lg bg-white border-t border-gray-200 first-of-type:mt-0">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{orderItem.name} </p>

                    <button
                        type="button"
                        onClick={() => dispatch(removeOrderItem(orderItem.id))}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(orderItem.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        disabled={orderItem.quantity <= MIN_ITEMS && true}
                        onClick={() => dispatch(decrementQuantity(orderItem.id))}
                        className="disabled:opacity-40"
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black ">
                        {orderItem.quantity}
                    </p>

                    <button
                        type="button"
                        disabled={orderItem.quantity >= MAX_ITEMS && true}
                        onClick={() => dispatch(incrementQuantity(orderItem.id))}
                        className="disabled:opacity-40"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(orderItem.subtotal)}
                    </span>
                </p>
            </div>
        </div>
    )
}

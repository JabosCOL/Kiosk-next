import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="h-full flex flex-col shadow-lg bg-white rounded-lg overflow-hidden">
            <Image
                src={getImagePath(product.image)}
                alt={`product ${product.name} image`}
                width={400}
                height={500}
                className="flex-1"
            />
            <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                <div>
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <p className="mt-2 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
                </div>
                <AddProductButton
                    product={product}
                />
            </div>
        </div>
    )
}

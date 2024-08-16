import { prisma } from "@/src/lib/prisma"
import { Category, Product } from "@prisma/client"
import ImageUpload from "./ImageUpload"

async function getCategories() {
    return await prisma.category.findMany()
}

type ProductFormProps = {
    product?: Product
}

export default async function ProductForm({ product }: ProductFormProps) {
    const categories: Category[] = await getCategories()

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={product?.name}
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Product Name"
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price"
                >Price:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={product?.price}
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Product Price"
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Category:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="">-- Select --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>
            <ImageUpload
                image={product?.image}
            />
        </>
    )
}
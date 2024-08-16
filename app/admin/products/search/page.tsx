import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Search Results For: {searchParams.search}</Heading>
            <div className="flex justify-end mt-10">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable
                    products={products}
                />
            ) : (
                <p className="text-center text-lg mt-10">No products, try searching for another term</p>
            )}
        </>
    )
}

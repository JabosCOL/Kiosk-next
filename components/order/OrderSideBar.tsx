import { prisma } from "@/src/lib/prisma"
import Category from "../ui/Category"
import Logo from "../ui/Logo"

async function getCategories() {
    return await prisma.category.findMany()
}

export default async function OrderSideBar() {
    const categories = await getCategories()

    return (
        <aside
            className="md:w-72 md:h-screen bg-white"
        >
            <Logo />
            {categories.map(category => (
                <Category
                    key={category.id}
                    category={category}
                />
            ))}
        </aside>
    )
}

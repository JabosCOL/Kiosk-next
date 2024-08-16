"use client"

import { SearchSchema } from "@/src/schemas"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {
    const router = useRouter()

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }

    return (
        <form
            action={handleSearchForm}
            className="flex items-center"
        >
            <input
                type="text"
                name="search"
                placeholder="Search Product"
                className="p-2 placeholder-gray-400 w-full"
            />
            <input
                type="submit"
                value={'Search'}
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
            />
        </form>
    )
}

"use client"

import { useRouter } from "next/navigation"

export default function GoBackButton() {
    const route = useRouter()
    return (
        <button
            onClick={() => route.back()}
            className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
            Go Back
        </button>
    )
}

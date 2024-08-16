"use client"

import type { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Category({category}: {category : Category}) {
    const params = useParams<{category: string}>()
    return (
        <Link href={`/order/${category.slug}`}>
            <div className={`${category.slug === params.category ? 'bg-amber-400' : ''} p-5 w-full flex items-center gap-4`}>
                <div className="w-16 h-16 relative">
                    <Image
                        src={`/icon_${category.slug}.svg`}
                        alt="category image"
                        fill
                    />
                </div>
                <p className="text-xl font-bold">{category.name}</p>
            </div>
        </Link>
    )
}

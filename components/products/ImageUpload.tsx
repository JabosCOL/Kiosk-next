"use client"
import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useEffect, useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload({ image }: { image: string | undefined }) {
    useEffect(() => {
        if (image) {
            setImageUrl(getImagePath(image))
        }
    }, [])

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    // @ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="tudm6upx"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Product Image</label>
                        <div
                            onClick={() => open()}
                            className={`${image && "hover:after:absolute hover:after:w-full hover:after:h-full hover:after:bg-black/70 hover:after:text-white hover:after:text-xl hover:after:content-['Click_here_to_upload_a_new_image'] hover:after:flex hover:after:justify-center hover:after:items-center"} relative p-10 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 cursor-pointer border-neutral-300 transition`}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Add Image</p>
                            {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Product Image"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="image"
                        value={imageUrl.startsWith('https://res.cloudinary.com') ? imageUrl : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}

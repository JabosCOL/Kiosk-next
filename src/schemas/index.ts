import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string()
        .min(1, 'Your name is required'),
    total: z.number()
        .min(1, "There's an error in the order"),
    orderProducts: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, { message: 'Search field is empty' })
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'Name is required' }),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Invalid price' })
        .or(z.number().min(1, { message: 'Price is required' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'Invalid category' })
        .or(z.number().min(1, { message: 'Category is required' })),
    image: z.string().min(1, {message: 'Image is required'})
})
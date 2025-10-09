import { defineCollection, z } from "astro:content";
//Z validador de esquemas: zod

const rooms = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        img: z.string()
    })
})

export const collections =  { rooms }
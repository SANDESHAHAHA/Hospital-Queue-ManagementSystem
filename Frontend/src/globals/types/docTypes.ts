import {z} from 'zod'

export const applyForDocSchema = z.object({
    specialization: z.string(),
    licenseNumber: z.string()
})
export type applyforDocData = z.infer<typeof applyForDocSchema>
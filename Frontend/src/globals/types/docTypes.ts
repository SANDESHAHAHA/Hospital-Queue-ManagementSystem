import {z} from 'zod'

export const applyForDocSchema = z.object({
    specialization: z.string(),
    licenseNumber: z.string()
})
export type applyforDocData = z.infer<typeof applyForDocSchema>

// export const applyForDocResSchema = z.object({
//     id:z.string(),
//     isApproved:z.boolean(),
//     avgConsultationTime:z.string(),
//     userId:z.string(),
//     specialization:z.string(),
//     licenseNumber:z.string(),
// })
// export type applyForDocResData = z.infer<typeof applyForDocResSchema>

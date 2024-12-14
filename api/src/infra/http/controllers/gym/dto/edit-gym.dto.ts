import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const editGymBodySchema = z.object({
  description: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().min(1),
  phone: z.string().min(1).max(15),
})

export type EditGymBodySchema = z.infer<typeof editGymBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editGymBodySchema)

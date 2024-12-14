import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createGymBodySchema = z.object({
  description: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().min(1),
  phone: z.string().min(1).max(15),
})

export type CreateGymBodySchema = z.infer<typeof createGymBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createGymBodySchema)

import { z } from 'zod';

export const chatSchema = z.object({ query: z.string().min(2) });
export const predictSchema = z.object({ assetData: z.any() }); // Expand strictly later
export const failureSchema = z.object({ failureData: z.any() });
export const partsSchema = z.object({ ticketData: z.any() });

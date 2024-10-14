import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_URL: z.string().url(),
});

export type env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(import.meta.env);

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export default env!;

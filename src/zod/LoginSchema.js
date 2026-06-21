 import { z } from 'zod';

 export const LoginSchema = z.object({  
 // email
  email: z
    .string()
    .min(1, { message: 'Enter your Email' })
    .email({ message: 'Invalid Email Format' }),

// password
  password: z
    .string()
    .min(1, { message: 'Enter your Password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

 
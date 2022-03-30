import { z } from 'zod';

const name = z.string({
  required_error: 'missing field: name',
});

const password = z.string({
  required_error: 'missing field: password',
});

const email = z
  .string({
    required_error: 'missing field: email',
  })
  .email('email not valid');

const RegisterSchema = z.object({
  body: z.object({
    name,
    password,
    email,
  }),
});

const LoginSchema = z.object({
  body: z.object({
    email,
    password,
  }),
});

export { RegisterSchema, LoginSchema };

import { z } from 'zod';

export const FormSchema = z.object({
    email: z.string().email('Format email tidak valid'),

    // Mengandung huruf dan spasi yang diperbolehkan
    nama_lengkap: z
        .string()
        .min(6, 'Nama lengkap minimal 6 karakter')
        .regex(/^[A-Za-z\s]+$/, 'Hanya huruf dan spasi yang diperbolehkan'),

    // Mengandung huruf angka
    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d).+$/,
            'Password harus mengandung huruf dan angka',
        ),
});

export type FormSchema = z.infer<typeof FormSchema>;
import { z } from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be under 50 characters" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .max(10, { message: "Password must be under 10 characters" }),
});

export const logInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .max(10, { message: "Password must be under 10 characters" }),
});

export const addressSchema = z.object({
  userId: z.string().optional(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(255, { message: "Address must be less than 255 characters" }),

  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .max(100, { message: "City must be less than 100 characters" }),

  phone: z.string().regex(/^\d{7,15}$/, {
    message: "Phone number must be between 7 to 15 digits",
  }),

  pincode: z.string().regex(/^\d{4,10}$/, {
    message: "Pincode must be between 4 to 10 digits",
  }),

  notes: z.string().max(500, { message: "Notes must be under 500 characters" }),
});

export const productSchema = z.object({
  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .nonempty({ message: "Image is required" }),

  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),

  category: z.string().min(2, { message: "Category is required" }),

  brand: z.string().min(2, { message: "Brand is required" }),

  price: z.coerce
    .number()
    .positive({ message: "Price must be a valid number greater than 0" }),

  salePrice: z.coerce
    .number()
    .min(0, { message: "Sale price must be a valid number" })
    .optional(),

  totalStock: z.coerce
    .number()
    .int()
    .min(1, { message: "Stock must be a non-negative integer" }),
});

export const updateProductSchema = z.object({
  image: z.string().optional(),

  title: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .optional(),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .optional(),

  category: z.string().min(2, { message: "Category is required" }).optional(),

  brand: z.string().min(2, { message: "Brand is required" }).optional(),

  price: z.coerce
    .number()
    .positive({ message: "Price must be a valid number greater than 0" })
    .optional(),

  salePrice: z.coerce
    .number()
    .min(0, { message: "Sale price must be a valid number" })
    .optional(),

  totalStock: z.coerce
    .number()
    .int()
    .min(1, { message: "Stock must be a non-negative integer" })
    .optional(),
});

import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  date: z.string().optional().default(""),
  time: z.string().optional().default(""),
  mode: z.string().optional().default(""),
  country: z.string().optional().default(""),
  tier: z.string().optional().default(""),
  note: z.string().min(1, "Note is required"),
  honeypot: z.string().optional().default(""),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

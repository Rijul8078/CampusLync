import { z } from "zod";
export const serviceOptions = [
  "Academic Support",
  "Assignment Support",
  "Dissertation Support",
  "Research Support",
  "Proofreading & Editing",
  "Tutoring",
  "Career Support",
  "CV / Resume Support",
  "Interview Preparation",
  "London Accommodation",
  "Moving to London",
  "Other",
] as const;
export const contactMethods = ["Email", "WhatsApp", "Phone"] as const;
export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name (at least 2 characters).")
      .max(100, "Use no more than 100 characters."),
    email: z.email("Enter a valid email address.").max(254),
    phone: z.string().trim().max(40, "Use no more than 40 characters."),
    university: z.string().trim().max(200, "Use no more than 200 characters."),
    country: z.string().trim().min(2, "Enter your current country.").max(100),
    studyCountry: z
      .string()
      .trim()
      .min(2, "Enter your country of study.")
      .max(100),
    service: z.enum(serviceOptions, { error: "Choose a service." }),
    message: z
      .string()
      .trim()
      .min(10, "Tell us a little more (at least 10 characters).")
      .max(5000, "Use no more than 5,000 characters."),
    contactMethod: z.enum(contactMethods, {
      error: "Choose a contact method.",
    }),
    consent: z
      .boolean()
      .refine((value) => value, "Please agree to the Privacy Policy."),
  })
  .superRefine((data, ctx) => {
    if (
      data.contactMethod !== "Email" &&
      !/^[+\d\s().-]{7,40}$/.test(data.phone)
    )
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Enter a phone number for your preferred contact method.",
      });
  });
export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;
export type SubmissionResult =
  | { status: "sent"; message: string }
  | { status: "invalid"; message: string; errors: EnquiryErrors }
  | { status: "unavailable" | "error"; message: string };
export function validationErrors(error: z.ZodError): EnquiryErrors {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  );
}

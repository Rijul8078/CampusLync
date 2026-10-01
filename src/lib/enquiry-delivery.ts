import {
  enquirySchema,
  validationErrors,
  type Enquiry,
  type SubmissionResult,
} from "./enquiries";
export type DeliveryAdapter = {
  deliver: (enquiry: Enquiry) => Promise<{ accepted: boolean }>;
};
// No adapter is installed. Enabling delivery requires an implementation, not just a flag.
export const deliveryAdapter: DeliveryAdapter | null = null;
export async function submitEnquiry(
  input: unknown,
  adapter: DeliveryAdapter | null = deliveryAdapter,
): Promise<{ code: number; result: SubmissionResult }> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return {
      code: 400,
      result: {
        status: "invalid",
        message: "Check the highlighted fields.",
        errors: validationErrors(parsed.error),
      },
    };
  if (!adapter)
    return {
      code: 503,
      result: {
        status: "unavailable",
        message:
          "Your enquiry has not been sent. Online enquiry delivery is not available yet. Please check back later.",
      },
    };
  try {
    const response = await adapter.deliver(parsed.data);
    if (!response.accepted) throw new Error("Delivery not accepted");
    return {
      code: 200,
      result: {
        status: "sent",
        message:
          "Your support request has been sent. Thank you for telling us what you need.",
      },
    };
  } catch {
    return {
      code: 502,
      result: {
        status: "error",
        message: "We could not confirm delivery. Please try again later.",
      },
    };
  }
}

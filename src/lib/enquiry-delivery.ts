import { submitEnquiry, type DeliveryAdapter } from "./enquiry-submission";
import { databaseConfigured } from "./database";
import {
  createEnquiry,
  rateLimitConfigured,
  setNotificationStatus,
} from "./enquiry-repository";
import { sendEnquiryNotification } from "./enquiry-email";
const databaseAdapter: DeliveryAdapter = {
  async deliver(enquiry) {
    const stored = await createEnquiry(enquiry);
    const notification = await sendEnquiryNotification(stored.id, enquiry);
    if (notification.configured)
      await setNotificationStatus(
        stored.id,
        notification.sent ? "sent" : "failed",
      );
    return { accepted: true };
  },
};

export const deliveryAdapter: DeliveryAdapter | null =
  databaseConfigured && rateLimitConfigured ? databaseAdapter : null;
export { submitEnquiry, type DeliveryAdapter };

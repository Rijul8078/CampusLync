import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../src/lib/enquiries";
import { submitEnquiry } from "../src/lib/enquiry-submission";
const valid = {
  name: "Test Student",
  email: "student@example.com",
  phone: "",
  university: "",
  country: "India",
  studyCountry: "Canada",
  service: "Academic Support",
  message: "I would like guidance with research planning.",
  contactMethod: "Email",
  consent: true,
};
test("accepts optional fields with email contact and trims text", () => {
  const data = enquirySchema.parse({ ...valid, name: " Test Student " });
  assert.equal(data.name, "Test Student");
});
test("rejects missing consent, invalid email and unsupported service", () => {
  for (const change of [
    { consent: false },
    { email: "invalid" },
    { service: "Write my assignment" },
    { message: "" },
    { country: "" },
    { studyCountry: "" },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...change }).success,
      false,
    );
});
test("requires a phone number for phone and WhatsApp contact", () => {
  for (const contactMethod of ["Phone", "WhatsApp"]) {
    assert.equal(
      enquirySchema.safeParse({ ...valid, contactMethod }).success,
      false,
    );
    assert.equal(
      enquirySchema.safeParse({
        ...valid,
        contactMethod,
        phone: "+44 7700 900000",
      }).success,
      true,
    );
  }
});
test("unconfigured delivery never succeeds", async () => {
  const result = await submitEnquiry(valid, null);
  assert.equal(result.code, 503);
  assert.equal(result.result.status, "unavailable");
  assert.match(result.result.message, /has not been sent/);
});
test("invalid data does not reach an adapter", async () => {
  let called = false;
  const result = await submitEnquiry(
    {},
    {
      deliver: async () => {
        called = true;
        return { accepted: true };
      },
    },
  );
  assert.equal(called, false);
  assert.equal(result.code, 400);
});
test("success requires adapter acceptance", async () => {
  let delivered;
  const result = await submitEnquiry(valid, {
    deliver: async (data) => {
      delivered = data;
      return { accepted: true };
    },
  });
  assert.deepEqual(delivered, valid);
  assert.equal(result.result.status, "sent");
});
test("adapter rejection and exceptions produce errors", async () => {
  for (const deliver of [
    async () => ({ accepted: false }),
    async () => {
      throw new Error("Provider error");
    },
  ]) {
    const result = await submitEnquiry(valid, { deliver });
    assert.equal(result.code, 502);
    assert.equal(result.result.status, "error");
  }
});

import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { appointmentSchema } from "./schema";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes("your-resend-api-key")) {
    console.warn("[appointmentFn] RESEND_API_KEY not configured.");
    return null;
  }
  return new Resend(apiKey);
}

// Use verified domain if set, otherwise fall back to Resend test sender.
// NOTE: onboarding@resend.dev can only send to the Resend account owner's email.
// To send to any client email, verify your domain at resend.com/domains.
const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN;
const FROM_ADDRESS = verifiedDomain
  ? `Appointments <noreply@${verifiedDomain}>`
  : "Appointments <onboarding@resend.dev>";

export const submitAppointment = createServerFn({ method: "POST" })
  .validator((data: unknown) => appointmentSchema.parse(data))
  .handler(async ({ data }) => {

    const { name, email, phone, date, time, mode, country, tier, note, honeypot } = data;

    if (honeypot) {
      return { success: true }; // silently drop bots
    }

    const resend = getResend();
    if (!resend) {
      console.log("[appointmentFn] Mock mode (no RESEND_API_KEY): appointment received for", name, email);
      return { success: true };
    }

    // Prepare both email promises
    const ownerPromise = resend.emails.send({
      from: FROM_ADDRESS,
      to: "uholawclub@gmail.com",
      subject: `New Appointment: ${name} - ${date ?? "TBD"} ${time ?? ""}`.trim(),
      html: `<h2>New Appointment Request</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone ?? "N/A"}</p><p><b>Date:</b> ${date ?? "N/A"}</p><p><b>Time:</b> ${time ?? "N/A"}</p><p><b>Mode:</b> ${mode ?? "N/A"}</p><p><b>Country/Timezone:</b> ${country ?? "N/A"}</p><p><b>Tier:</b> ${tier ?? "N/A"}</p><p><b>Note:</b> ${note}</p>`,
    });

    const clientPromise = resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Appointment Request Received",
      html: `<h2>Your Appointment Request is Received!</h2><p>Hi ${name},</p><p>We have received your appointment request for <b>${tier ?? "consultation"}</b>.</p><p><b>Date:</b> ${date ?? "TBD"} &nbsp;<b>Time:</b> ${time ?? "TBD"}</p><p><b>Mode:</b> ${mode ?? "N/A"}</p><p>Please pay via UPI ID: <b>uholawclub@sbi</b>.</p><p>We look forward to seeing you!</p>`,
    });

    // Wait for both to finish without short-circuiting on failure
    const results = await Promise.allSettled([ownerPromise, clientPromise]);

    const ownerResult = results[0];
    const clientResult = results[1];

    const ownerFailed =
      ownerResult.status === "rejected" ||
      (ownerResult.status === "fulfilled" && ownerResult.value.error);
    const clientFailed =
      clientResult.status === "rejected" ||
      (clientResult.status === "fulfilled" && clientResult.value.error);

    if (ownerFailed) {
      console.error(
        "[appointmentFn] Owner email error:",
        ownerResult.status === "rejected" ? ownerResult.reason : ownerResult.value.error,
      );
    }

    if (clientFailed) {
      console.error(
        "[appointmentFn] Client email error:",
        clientResult.status === "rejected" ? clientResult.reason : clientResult.value.error,
      );
    }

    if (ownerFailed && clientFailed) {
      throw new Error(
        "Failed to send appointment emails. Please try again or contact us directly.",
      );
    } else if (ownerFailed || clientFailed) {
      console.warn("[appointmentFn] One email failed, but treating as soft success.");
    } else {
      console.log("[appointmentFn] Both emails sent successfully.");
    }

    return { success: true };
  });

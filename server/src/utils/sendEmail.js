import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (contactData) => {
  // 🔥 safety checks
  if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not defined in .env");
  }

  if (!contactData?.email) {
    throw new Error("User email is missing in contactData");
  }

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission - ${contactData.subject || "No Subject"}`,
    html: `
  <div style="font-family: Arial, sans-serif; background:#f5f6f8; padding:40px 0;">
    <div style="max-width:650px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); padding:25px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:20px;">
          New Contact Inquiry 📩
        </h1>
        <p style="color:#cbd5e1; margin-top:6px; font-size:13px;">
          Embrodivine Website Notification
        </p>
      </div>

      <!-- Body -->
      <div style="padding:30px;">

        <!-- Info Card -->
        <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:10px; padding:20px; margin-bottom:20px;">
          
          <p style="margin:8px 0; font-size:14px; color:#111827;">
            <strong>Name:</strong> ${contactData.name || "N/A"}
          </p>

          <p style="margin:8px 0; font-size:14px; color:#111827;">
            <strong>Email:</strong> ${contactData.email || "N/A"}
          </p>

          <p style="margin:8px 0; font-size:14px; color:#111827;">
            <strong>Phone:</strong> ${contactData.phone || "N/A"}
          </p>

          <p style="margin:8px 0; font-size:14px; color:#111827;">
            <strong>Subject:</strong> ${contactData.subject || "N/A"}
          </p>

        </div>

        <!-- Message Box -->
        <div style="border-left:4px solid #1e293b; background:#ffffff; padding:15px 20px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <h3 style="margin:0 0 10px 0; font-size:14px; color:#111827;">
            Message:
          </h3>
          <p style="margin:0; font-size:14px; color:#374151; line-height:1.6;">
            ${contactData.message || "N/A"}
          </p>
        </div>

        <!-- Footer Note -->
        <div style="margin-top:25px; font-size:13px; color:#6b7280; text-align:center;">
          ⚡ This is an automated notification from Embrodivine contact system
        </div>

      </div>
    </div>
  </div>
`,
  };

  const userAutoReply = {
    from: process.env.EMAIL_USER,
    to: contactData.email,
    subject: "We've received your message — Embrodivine",
    html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:2rem 1rem;">
<tr><td align="center">
<table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E0E0E0;">

  <!-- Header -->
  <tr>
    <td style="background:#1A1A1A;padding:2rem;text-align:center;">
      <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:0.75rem;">
        <div style="width:2px;height:22px;background:#D4AF37;border-radius:1px;display:inline-block;"></div>
        <span style="color:#D4AF37;font-size:20px;font-weight:bold;letter-spacing:0.12em;">EMBRODIVINE</span>
        <div style="width:2px;height:22px;background:#D4AF37;border-radius:1px;display:inline-block;"></div>
      </div>
      <p style="color:#9CA3AF;font-size:11px;letter-spacing:0.08em;margin:0;text-transform:uppercase;">Premium Embroidery Digitizing Services</p>
    </td>
  </tr>

  <!-- Gold bar -->
  <tr><td style="height:3px;background:linear-gradient(90deg,#1A1A1A,#D4AF37,#E8D7B5,#D4AF37,#1A1A1A);"></td></tr>

  <!-- Body -->
  <tr>
    <td style="padding:2rem;color:#111827;">

      <!-- Confirmation -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:1.5rem;">
        <tr>
          <td style="width:40px;vertical-align:middle;">
            <div style="width:36px;height:36px;border-radius:50%;background:#D4AF37;text-align:center;line-height:36px;font-size:18px;color:#1A1A1A;font-weight:bold;">✓</div>
          </td>
          <td style="padding-left:12px;vertical-align:middle;">
            <p style="font-size:15px;font-weight:600;color:#111827;margin:0;">Message received!</p>
            <p style="font-size:12px;color:#6B7280;margin:0;">We'll get back to you shortly</p>
          </td>
        </tr>
      </table>

      <p style="font-size:15px;color:#111827;margin:0 0 0.75rem;">Hello <strong>${contactData.name || "there"}</strong>,</p>
      <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 1.5rem;">Thank you for reaching out to <strong style="color:#111827;">Embrodivine</strong>. We have successfully received your message and our team is already reviewing it.</p>

      <!-- Stats row -->
      <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E0E0E0;border-radius:8px;overflow:hidden;margin-bottom:1.5rem;">
        <tr>
          <td width="50%" style="padding:1rem;text-align:center;border-right:1px solid #E0E0E0;">
            <p style="font-size:22px;margin:0 0 4px;">⏱</p>
            <p style="font-size:18px;font-weight:600;color:#111827;margin:0;">24 hrs</p>
            <p style="font-size:10px;color:#9CA3AF;margin:0;text-transform:uppercase;letter-spacing:0.05em;">Response time</p>
          </td>
          <td width="50%" style="padding:1rem;text-align:center;">
            <p style="font-size:22px;margin:0 0 4px;">🎧</p>
            <p style="font-size:18px;font-weight:600;color:#111827;margin:0;">24/7</p>
            <p style="font-size:10px;color:#9CA3AF;margin:0;text-transform:uppercase;letter-spacing:0.05em;">Support</p>
          </td>
        </tr>
      </table>

      <!-- What happens next -->
      <p style="font-size:11px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.07em;margin:0 0 0.75rem;">What happens next</p>
      <table cellpadding="0" cellspacing="0" style="margin-bottom:1.5rem;">
        <tr>
          <td style="padding:6px 0;">
            <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#D4AF37;text-align:center;line-height:22px;font-size:11px;font-weight:bold;color:#1A1A1A;">1</span>
            <span style="font-size:13px;color:#374151;margin-left:10px;">Our team reviews your inquiry</span>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;">
            <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#F3F4F6;border:1px solid #E0E0E0;text-align:center;line-height:22px;font-size:11px;font-weight:bold;color:#6B7280;">2</span>
            <span style="font-size:13px;color:#374151;margin-left:10px;">We prepare a personalised response</span>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;">
            <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#F3F4F6;border:1px solid #E0E0E0;text-align:center;line-height:22px;font-size:11px;font-weight:bold;color:#6B7280;">3</span>
            <span style="font-size:13px;color:#374151;margin-left:10px;">You receive our reply within 24 hours</span>
          </td>
        </tr>
      </table>

      <!-- Sign off -->
      <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #E0E0E0;padding-top:1.5rem;margin-top:0.5rem;">
        <tr><td style="padding-top:1.5rem;">
          <p style="font-size:13px;color:#6B7280;margin:0 0 2px;">With warm regards,</p>
          <p style="font-size:14px;font-weight:600;color:#111827;margin:0 0 10px;">Embrodivine Team</p>
          <span style="display:inline-block;background:#F9FAFB;border:1px solid #E0E0E0;border-radius:999px;padding:5px 14px;font-size:12px;color:#6B7280;">
            ✉ support@embrodivine.com
          </span>
        </td></tr>
      </table>

    </td>
  </tr>

  <!-- Gold bar -->
  <tr><td style="height:2px;background:linear-gradient(90deg,#1A1A1A,#D4AF37,#E8D7B5,#D4AF37,#1A1A1A);"></td></tr>

  <!-- Footer -->
  <tr>
    <td style="background:#1A1A1A;padding:1rem 2rem;text-align:center;">
      <p style="font-size:11px;color:#6B7280;margin:0;">
        © ${new Date().getFullYear()} Embrodivine. All rights reserved.<br/>
        You're receiving this because you submitted our contact form.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>
`,
  };

  await transporter.sendMail(adminMailOptions);

  // ⚠️ optional safety (user email fail na kare system)
  if (contactData.email) {
    await transporter.sendMail(userAutoReply);
  }
};

export const sendReplyToContact = async ({
  name,
  email,
  subject,
  originalMessage,
  replyMessage,
}) => {
  const replyUser = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: `Reply to Your Inquiry - ${subject}`,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#F4F4F4; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 2rem 1rem;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #E0E0E0;">

          <!-- Header -->
          <tr>
            <td style="background:#1A1A1A; padding:2rem; text-align:center;">
              <div style="width:48px;height:48px;border-radius:50%;background:#D4AF37;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:22px;color:#1A1A1A;">✉</div>
              <p style="color:#D4AF37;font-size:12px;letter-spacing:0.08em;margin:0;text-transform:uppercase;">Support Team</p>
              <h1 style="color:#E8D7B5;font-size:20px;font-weight:500;margin:0.4rem 0 0;">We've replied to your message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:2rem;">

              <p style="font-size:15px;color:#1A1A1A;margin:0 0 1rem;">Hello <strong>${name}</strong>,</p>
              <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 1.5rem;">Thank you for reaching out. We've reviewed your message and have a response for you below.</p>

              <!-- Original Message -->
              <div style="border:1px solid #E0E0E0;border-radius:8px;overflow:hidden;margin-bottom:1.5rem;">
                <div style="background:#F8F8F8;padding:0.5rem 1rem;border-bottom:1px solid #E0E0E0;">
                  <span style="font-size:12px;color:#888;font-weight:600;">YOUR ORIGINAL MESSAGE</span>
                </div>
                <div style="padding:1rem;">
                  <p style="font-size:14px;color:#666;font-style:italic;line-height:1.7;margin:0;">"${originalMessage}"</p>
                </div>
              </div>

              <!-- Admin Reply -->
              <div style="border:2px solid #D4AF37;border-radius:8px;overflow:hidden;margin-bottom:2rem;">
                <div style="background:#D4AF37;padding:0.5rem 1rem;">
                  <span style="font-size:12px;color:#1A1A1A;font-weight:600;">OUR REPLY</span>
                </div>
                <div style="padding:1rem;">
                  <p style="font-size:14px;color:#1A1A1A;line-height:1.7;margin:0;">${replyMessage}</p>
                </div>
              </div>

              <!-- Sign off -->
              <div style="border-top:1px solid #E0E0E0;padding-top:1.5rem;text-align:center;">
                <p style="font-size:13px;color:#888;margin:0 0 0.3rem;">With warm regards,</p>
                <p style="font-size:14px;font-weight:600;color:#1A1A1A;margin:0 0 1rem;">Your Support Team</p>
                <span style="display:inline-block;background:#F8F8F8;border:1px solid #E0E0E0;border-radius:999px;padding:0.4rem 1rem;font-size:12px;color:#888;">
                  ✉ support@embrodivine.com
                </span>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8F8F8;border-top:1px solid #E0E0E0;padding:1rem 2rem;text-align:center;">
              <p style="font-size:11px;color:#AAAAAA;margin:0;">
                You received this email because you contacted us via our website.<br/>
                Please do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`,
  };

  await transporter.sendMail(replyUser);
};

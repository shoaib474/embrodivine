import nodemailer from "nodemailer";

export const sendContactEmail = async (contactData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or use SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission - ${contactData.subject}`,
    html: `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || "N/A"}</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `,
  };

  const userAutoReply = {
    from: process.env.EMAIL_USER,
    to: contactData.email,
    subject: "We received your message - Embrodivine",
    html: `
      <h2>Thank you for contacting Embrodivine</h2>
      <p>Hello ${contactData.name},</p>
      <p>We have received your message regarding "${contactData.subject}".</p>
      <p>Our team will get back to you within 24 hours.</p>
      <br/>
      <p>Best Regards,</p>
      <p>Embrodivine Team</p>
    `,
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(userAutoReply);
};

/**
 * Lightweight email helper for sending verification codes.
 * If SMTP environment variables are set and `nodemailer` is installed,
 * this will attempt to send real email. Otherwise it falls back to logging
 * the code to the console (useful during development).
 */
export async function sendVerificationEmail(to, code) {
  const smtpHost = process.env.SMTP_HOST
  if (smtpHost) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      })

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to,
        subject: 'Your verification code',
        text: `Your verification code is: ${code}`,
        html: `<p>Your verification code is: <strong>${code}</strong></p>`,
      })
      console.log(`Email sent to ${to}`)
      return true
    } catch (e) {
      console.error('sendVerificationEmail: failed to send via SMTP', e)
      // fall through to console fallback
    }
  }

  // Fallback for development: log the code
  console.log(`[email fallback] Verification code for ${to}: ${code}`)
  return true
}

export default sendVerificationEmail

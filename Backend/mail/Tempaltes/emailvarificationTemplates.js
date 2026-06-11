/**
 * emailVerificationTemplates.js
 * Two templates:
 *   1. verificationEmail  — sent after registration; user clicks to verify
 *   2. verificationSuccessEmail — sent once verification is complete
 *
 * Usage:
 *   const { verificationEmail, verificationSuccessEmail } = require('./emailVerificationTemplates');
 *   const msg = verificationEmail({ userName, verifyUrl, expiresIn, supportEmail, platformName, logoUrl });
 */

// ─────────────────────────────────────────────────────────────────────────────
// Shared base styles (inlined for cross-client compatibility)
// ─────────────────────────────────────────────────────────────────────────────
const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', Arial, sans-serif;
    background-color: #f0f4f8;
    color: #1a202c;
    -webkit-font-smoothing: antialiased;
  }
  .wrapper {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  .body { padding: 40px 48px; }
  .footer {
    background: #f7faff;
    border-top: 1px solid #e2e8f0;
    padding: 24px 48px;
    text-align: center;
  }
  .footer p { font-size: 12.5px; color: #718096; line-height: 1.7; margin-bottom: 6px; }
  .footer a { color: #1a56db; text-decoration: none; }
  .footer .divider { border: none; border-top: 1px solid #e2e8f0; margin: 14px 0; }
  @media (max-width: 600px) {
    .wrapper { margin: 0; border-radius: 0; }
    .body, .footer { padding: 28px 20px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Verification Request Email
// ─────────────────────────────────────────────────────────────────────────────
const verificationEmail = ({
    userName = "User",
    verifyUrl = "#",
    expiresIn = "24 hours",
    supportEmail = "support@yourplatform.com",
    platformName = "LearnHub",
    logoUrl = "https://yourplatform.com/logo.png",
}) => {
    const subject = `Verify your email address for ${platformName}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
  <style>
    ${BASE_STYLES}

    .header {
      background: linear-gradient(135deg, #0f766e 0%, #0d5e58 100%);
      padding: 40px 48px 36px;
      text-align: center;
    }
    .header img { height: 34px; margin-bottom: 22px; }
    .header-icon {
      font-size: 48px;
      margin-bottom: 14px;
      display: block;
    }
    .header h1 { color: #fff; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.82); font-size: 14px; margin-top: 8px; }

    .greeting { font-size: 15px; color: #4a5568; line-height: 1.7; margin-bottom: 24px; }
    .greeting strong { color: #1a202c; }

    /* OTP-style token block (for token-based flows) */
    .token-block {
      background: #f0fdf4;
      border: 2px dashed #22c55e;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 20px 0 28px;
    }
    .token-block .label {
      font-size: 12px;
      color: #15803d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .token-block .token {
      font-size: 32px;
      font-weight: 700;
      color: #15803d;
      letter-spacing: 8px;
    }

    /* CTA */
    .cta-section { text-align: center; margin: 28px 0; }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #0f766e, #0d5e58);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 14px 44px;
      border-radius: 8px;
    }

    .expiry-note {
      text-align: center;
      font-size: 13px;
      color: #718096;
      margin-top: 10px;
    }
    .expiry-note strong { color: #d97706; }

    .fallback-url {
      background: #f7faff;
      border: 1px solid #dbeafe;
      border-radius: 8px;
      padding: 14px 16px;
      margin: 28px 0;
      font-size: 12.5px;
      color: #4a5568;
      word-break: break-all;
    }
    .fallback-url span { display: block; margin-bottom: 6px; font-weight: 600; color: #1a202c; }
    .fallback-url a { color: #1a56db; }

    .security-note {
      background: #fff8f1;
      border-left: 4px solid #f97316;
      border-radius: 0 8px 8px 0;
      padding: 14px 16px;
      font-size: 13px;
      color: #7c2d12;
      line-height: 1.65;
      margin-top: 24px;
    }
    .security-note strong { display: block; margin-bottom: 4px; color: #9a3412; font-size: 12px; text-transform: uppercase; letter-spacing: 0.7px; }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <img src="${logoUrl}" alt="${platformName}"/>
    <span class="header-icon">✉️</span>
    <h1>Confirm your email address</h1>
    <p>One quick step to activate your ${platformName} account.</p>
  </div>

  <!-- Body -->
  <div class="body">
    <p class="greeting">
      Hi <strong>${userName}</strong>,<br/><br/>
      Thanks for signing up! To complete your registration and access all features,
      please verify your email address by clicking the button below.
    </p>

    <div class="cta-section">
      <a href="${verifyUrl}" class="cta-btn">Verify My Email</a>
    </div>
    <p class="expiry-note">This link expires in <strong>${expiresIn}</strong>.</p>

    <div class="fallback-url">
      <span>Button not working? Copy and paste this URL into your browser:</span>
      <a href="${verifyUrl}">${verifyUrl}</a>
    </div>

    <div class="security-note">
      <strong>🔒 Security notice</strong>
      If you didn't create an account with ${platformName}, you can safely ignore this email.
      No action is required and your information is secure.
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>Need help? <a href="mailto:${supportEmail}">${supportEmail}</a></p>
    <hr class="divider"/>
    <p><a href="#">Unsubscribe</a> &nbsp;·&nbsp; <a href="#">Privacy Policy</a></p>
    <p style="margin-top:8px;">© ${new Date().getFullYear()} ${platformName}. All rights reserved.</p>
  </div>

</div>
</body>
</html>
  `.trim();

    const text = `
Hi ${userName},

Please verify your email address to activate your ${platformName} account.

Verify here: ${verifyUrl}

This link expires in ${expiresIn}.

If you didn't sign up, ignore this email.

— ${platformName} Team | ${supportEmail}
  `.trim();

    return { subject, html, text };
};


// ─────────────────────────────────────────────────────────────────────────────
// 2. Verification Success Email
// ─────────────────────────────────────────────────────────────────────────────
const verificationSuccessEmail = ({
    userName = "User",
    loginUrl = "#",
    supportEmail = "support@yourplatform.com",
    platformName = "LearnHub",
    logoUrl = "https://yourplatform.com/logo.png",
}) => {
    const subject = `✅ Email verified — Welcome to ${platformName}!`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verified</title>
  <style>
    ${BASE_STYLES}

    .header {
      background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
      padding: 44px 48px;
      text-align: center;
    }
    .header img { height: 34px; margin-bottom: 20px; }
    .checkmark {
      width: 64px;
      height: 64px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
      font-size: 32px;
    }
    .header h1 { color: #fff; font-size: 26px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.85); font-size: 15px; margin-top: 8px; }

    .greeting { font-size: 15px; color: #4a5568; line-height: 1.7; margin-bottom: 28px; }
    .greeting strong { color: #1a202c; }

    /* What's next list */
    .next-steps { margin: 24px 0 32px; }
    .next-steps h3 {
      font-size: 13px;
      font-weight: 700;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }
    .step-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f4f8;
      font-size: 14px;
      color: #2d3748;
    }
    .step-item:last-child { border-bottom: none; }
    .step-icon {
      width: 36px;
      height: 36px;
      background: #f0fdf4;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .step-text strong { display: block; font-weight: 600; color: #1a202c; margin-bottom: 2px; }
    .step-text span { color: #718096; font-size: 13px; }

    .cta-section { text-align: center; margin: 32px 0; }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #16a34a, #15803d);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 14px 44px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <img src="${logoUrl}" alt="${platformName}"/>
    <div class="checkmark">✅</div>
    <h1>You're verified!</h1>
    <p>Your email has been successfully confirmed.</p>
  </div>

  <!-- Body -->
  <div class="body">
    <p class="greeting">
      Hi <strong>${userName}</strong>,<br/><br/>
      Great news — your email address is now verified and your
      <strong>${platformName}</strong> account is fully active. Here's what you can do next:
    </p>

    <div class="next-steps">
      <h3>What's next</h3>

      <div class="step-item">
        <div class="step-icon">📚</div>
        <div class="step-text">
          <strong>Browse Courses</strong>
          <span>Explore our catalog and enroll in your first course.</span>
        </div>
      </div>

      <div class="step-item">
        <div class="step-icon">👤</div>
        <div class="step-text">
          <strong>Complete Your Profile</strong>
          <span>Add a photo and bio so instructors know who you are.</span>
        </div>
      </div>

      <div class="step-item">
        <div class="step-icon">🎯</div>
        <div class="step-text">
          <strong>Set Learning Goals</strong>
          <span>Define your weekly targets to stay consistent.</span>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <a href="${loginUrl}" class="cta-btn">Start Learning →</a>
    </div>

    <p style="font-size:13.5px; color:#718096; text-align:center;">
      Questions? We're here — <a href="mailto:${supportEmail}" style="color:#1a56db;">${supportEmail}</a>
    </p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>© ${new Date().getFullYear()} ${platformName}. All rights reserved.</p>
    <hr class="divider"/>
    <p><a href="#">Unsubscribe</a> &nbsp;·&nbsp; <a href="#">Privacy Policy</a></p>
  </div>

</div>
</body>
</html>
  `.trim();

    const text = `
Hi ${userName},

Your email address has been successfully verified. Your ${platformName} account is now fully active.

Log in and start learning: ${loginUrl}

Questions? ${supportEmail}

— ${platformName} Team
  `.trim();

    return { subject, html, text };
};


module.exports = { verificationEmail, verificationSuccessEmail };


// ── Quick test ──────────────────────────────────────────────────────────────
if (require.main === module) {
    const { verificationEmail, verificationSuccessEmail } = module.exports;

    const v1 = verificationEmail({
        userName: "Aanya Sharma",
        verifyUrl: "https://learnhub.io/verify?token=abc123",
        expiresIn: "48 hours",
        supportEmail: "support@learnhub.io",
        platformName: "LearnHub",
    });
    console.log("Subject:", v1.subject);

    const v2 = verificationSuccessEmail({
        userName: "Aanya Sharma",
        loginUrl: "https://learnhub.io/login",
        platformName: "LearnHub",
    });
    console.log("Subject:", v2.subject);
}
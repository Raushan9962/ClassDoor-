/**
 * passwordUpdate.js
 * Two templates:
 *   1. passwordResetRequestEmail  — user requests a reset link
 *   2. passwordChangedEmail       — confirmation after a successful change
 *
 * Usage:
 *   const { passwordResetRequestEmail, passwordChangedEmail } = require('./passwordUpdate');
 */

// ─────────────────────────────────────────────────────────────────────────────
// Shared base styles
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
// Helper: format date
// ─────────────────────────────────────────────────────────────────────────────
const formatDate = (date = new Date()) =>
    date.toLocaleString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });


// ─────────────────────────────────────────────────────────────────────────────
// 1. Password Reset Request Email
// ─────────────────────────────────────────────────────────────────────────────
const passwordResetRequestEmail = ({
    userName = "User",
    resetUrl = "#",
    expiresIn = "30 minutes",
    requestedAt = formatDate(),
    ipAddress = "Unknown",
    supportEmail = "support@yourplatform.com",
    platformName = "LearnHub",
    logoUrl = "https://yourplatform.com/logo.png",
}) => {
    const subject = `Reset your ${platformName} password`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    ${BASE_STYLES}

    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      padding: 40px 48px;
      text-align: center;
    }
    .header img { height: 34px; margin-bottom: 20px; }
    .lock-icon {
      font-size: 48px;
      margin-bottom: 14px;
      display: block;
    }
    .header h1 { color: #fff; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.82); font-size: 14px; margin-top: 8px; }

    .greeting { font-size: 15px; color: #4a5568; line-height: 1.7; margin-bottom: 24px; }
    .greeting strong { color: #1a202c; }

    /* CTA */
    .cta-section { text-align: center; margin: 28px 0 10px; }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #7c3aed, #5b21b6);
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
      margin-top: 12px;
    }
    .expiry-note strong { color: #dc2626; }

    /* Request meta */
    .meta-card {
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      border-radius: 10px;
      padding: 18px 20px;
      margin: 28px 0;
      font-size: 13px;
    }
    .meta-card h4 {
      font-size: 11.5px;
      font-weight: 700;
      color: #7c3aed;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      margin-bottom: 12px;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid #ede9fe;
      color: #4a5568;
    }
    .meta-row:last-child { border-bottom: none; }
    .meta-row span:last-child { font-weight: 600; color: #1a202c; }

    /* Fallback URL */
    .fallback-url {
      background: #f7faff;
      border: 1px solid #dbeafe;
      border-radius: 8px;
      padding: 14px 16px;
      margin: 20px 0;
      font-size: 12.5px;
      color: #4a5568;
      word-break: break-all;
    }
    .fallback-url span { display: block; margin-bottom: 6px; font-weight: 600; color: #1a202c; }
    .fallback-url a { color: #7c3aed; }

    /* Security alert */
    .security-alert {
      background: #fff1f2;
      border-left: 4px solid #f43f5e;
      border-radius: 0 8px 8px 0;
      padding: 16px 18px;
      margin-top: 24px;
    }
    .security-alert strong {
      display: block;
      font-size: 12px;
      color: #be123c;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
    }
    .security-alert p { font-size: 13.5px; color: #9f1239; line-height: 1.65; }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <img src="${logoUrl}" alt="${platformName}"/>
    <span class="lock-icon">🔐</span>
    <h1>Reset your password</h1>
    <p>We received a request to reset the password for your account.</p>
  </div>

  <!-- Body -->
  <div class="body">
    <p class="greeting">
      Hi <strong>${userName}</strong>,<br/><br/>
      A password reset was requested for your <strong>${platformName}</strong> account.
      Click the button below to choose a new password. If you didn't request this, no changes
      have been made — you can safely ignore this email.
    </p>

    <div class="cta-section">
      <a href="${resetUrl}" class="cta-btn">Reset My Password</a>
    </div>
    <p class="expiry-note">
      This link expires in <strong>${expiresIn}</strong> and can only be used once.
    </p>

    <!-- Request Metadata -->
    <div class="meta-card">
      <h4>🕵️ Request Details</h4>
      <div class="meta-row">
        <span>Requested At</span>
        <span>${requestedAt}</span>
      </div>
      <div class="meta-row">
        <span>IP Address</span>
        <span>${ipAddress}</span>
      </div>
      <div class="meta-row">
        <span>Account</span>
        <span>${platformName}</span>
      </div>
    </div>

    <div class="fallback-url">
      <span>Button not working? Paste this into your browser:</span>
      <a href="${resetUrl}">${resetUrl}</a>
    </div>

    <div class="security-alert">
      <strong>⚠️ Didn't request this?</strong>
      <p>
        If you didn't request a password reset, your account may be at risk. 
        Please contact us immediately at 
        <a href="mailto:${supportEmail}" style="color:#be123c;">${supportEmail}</a> 
        so we can secure your account.
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>© ${new Date().getFullYear()} ${platformName}. All rights reserved.</p>
    <hr class="divider"/>
    <p><a href="#">Unsubscribe</a> &nbsp;·&nbsp; <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Help</a></p>
  </div>

</div>
</body>
</html>
  `.trim();

    const text = `
Hi ${userName},

We received a request to reset the password for your ${platformName} account.

Reset your password: ${resetUrl}

This link expires in ${expiresIn} and can only be used once.

Request details:
  - Time      : ${requestedAt}
  - IP        : ${ipAddress}

If you didn't request this, contact us at ${supportEmail} immediately.

— ${platformName} Team
  `.trim();

    return { subject, html, text };
};


// ─────────────────────────────────────────────────────────────────────────────
// 2. Password Changed Confirmation Email
// ─────────────────────────────────────────────────────────────────────────────
const passwordChangedEmail = ({
    userName = "User",
    changedAt = formatDate(),
    ipAddress = "Unknown",
    device = "Unknown device",
    loginUrl = "#",
    supportEmail = "support@yourplatform.com",
    platformName = "LearnHub",
    logoUrl = "https://yourplatform.com/logo.png",
}) => {
    const subject = `Your ${platformName} password has been changed`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Changed</title>
  <style>
    ${BASE_STYLES}

    .header {
      background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
      padding: 40px 48px;
      text-align: center;
    }
    .header img { height: 34px; margin-bottom: 20px; }
    .shield-icon {
      font-size: 48px;
      margin-bottom: 14px;
      display: block;
    }
    .header h1 { color: #fff; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.82); font-size: 14px; margin-top: 8px; }

    .greeting { font-size: 15px; color: #4a5568; line-height: 1.7; margin-bottom: 26px; }
    .greeting strong { color: #1a202c; }

    /* Confirmation banner */
    .confirm-banner {
      background: #f0fdf4;
      border: 1.5px solid #86efac;
      border-radius: 10px;
      padding: 18px 22px;
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
    }
    .confirm-icon { font-size: 28px; flex-shrink: 0; }
    .confirm-text strong { display: block; font-size: 15px; color: #15803d; font-weight: 700; margin-bottom: 3px; }
    .confirm-text span { font-size: 13px; color: #166534; }

    /* Change metadata */
    .meta-card {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 10px;
      padding: 18px 20px;
      margin: 0 0 28px;
      font-size: 13px;
    }
    .meta-card h4 {
      font-size: 11.5px;
      font-weight: 700;
      color: #0369a1;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      margin-bottom: 12px;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      padding: 7px 0;
      border-bottom: 1px solid #e0f2fe;
      color: #4a5568;
      font-size: 13.5px;
    }
    .meta-row:last-child { border-bottom: none; }
    .meta-row span:last-child { font-weight: 600; color: #1a202c; }

    /* CTA */
    .cta-section { text-align: center; margin: 28px 0; }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #0369a1, #075985);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 13px 40px;
      border-radius: 8px;
    }

    /* Emergency block */
    .emergency-block {
      background: #fff1f2;
      border: 1.5px solid #fda4af;
      border-radius: 10px;
      padding: 18px 20px;
      margin-top: 10px;
    }
    .emergency-block h4 {
      font-size: 13px;
      font-weight: 700;
      color: #be123c;
      margin-bottom: 10px;
    }
    .emergency-block p { font-size: 13.5px; color: #9f1239; line-height: 1.65; }
    .emergency-block a { color: #be123c; font-weight: 600; }

    /* Security tips */
    .tips {
      margin-top: 28px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 10px;
    }
    .tips h4 {
      font-size: 12px;
      font-weight: 700;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
    }
    .tips ul { padding-left: 18px; font-size: 13.5px; color: #4a5568; line-height: 1.8; }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <img src="${logoUrl}" alt="${platformName}"/>
    <span class="shield-icon">🛡️</span>
    <h1>Password successfully changed</h1>
    <p>Your account security has been updated.</p>
  </div>

  <!-- Body -->
  <div class="body">
    <p class="greeting">
      Hi <strong>${userName}</strong>,<br/><br/>
      This email confirms that the password for your <strong>${platformName}</strong> account
      was successfully changed. Review the details below.
    </p>

    <!-- Success Banner -->
    <div class="confirm-banner">
      <span class="confirm-icon">✅</span>
      <div class="confirm-text">
        <strong>Password updated successfully</strong>
        <span>You can now log in with your new password.</span>
      </div>
    </div>

    <!-- Change Metadata -->
    <div class="meta-card">
      <h4>📋 Change Details</h4>
      <div class="meta-row">
        <span>Changed At</span>
        <span>${changedAt}</span>
      </div>
      <div class="meta-row">
        <span>Device</span>
        <span>${device}</span>
      </div>
      <div class="meta-row">
        <span>IP Address</span>
        <span>${ipAddress}</span>
      </div>
    </div>

    <div class="cta-section">
      <a href="${loginUrl}" class="cta-btn">Log In to My Account</a>
    </div>

    <!-- Emergency block -->
    <div class="emergency-block">
      <h4>⚠️ Wasn't you?</h4>
      <p>
        If you did <strong>not</strong> make this change, your account may have been
        compromised. Contact our security team immediately at
        <a href="mailto:${supportEmail}">${supportEmail}</a> and we'll lock your account
        and investigate.
      </p>
    </div>

    <!-- Security tips -->
    <div class="tips">
      <h4>🔒 Keep your account safe</h4>
      <ul>
        <li>Use a unique password you don't use elsewhere.</li>
        <li>Enable two-factor authentication in account settings.</li>
        <li>Never share your password with anyone.</li>
        <li>Check for unrecognized logins in your activity log.</li>
      </ul>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>© ${new Date().getFullYear()} ${platformName}. All rights reserved.</p>
    <hr class="divider"/>
    <p><a href="#">Unsubscribe</a> &nbsp;·&nbsp; <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Help</a></p>
  </div>

</div>
</body>
</html>
  `.trim();

    const text = `
Hi ${userName},

Your ${platformName} password was successfully changed.

Change details:
  - Changed At : ${changedAt}
  - Device     : ${device}
  - IP Address : ${ipAddress}

Log in: ${loginUrl}

If you didn't make this change, contact us immediately at ${supportEmail}.

— ${platformName} Security Team
  `.trim();

    return { subject, html, text };
};


module.exports = { passwordResetRequestEmail, passwordChangedEmail };


// ── Quick test ──────────────────────────────────────────────────────────────
if (require.main === module) {
    const { passwordResetRequestEmail, passwordChangedEmail } = module.exports;

    const r = passwordResetRequestEmail({
        userName: "Aanya Sharma",
        resetUrl: "https://learnhub.io/reset?token=xyz789",
        expiresIn: "30 minutes",
        ipAddress: "103.45.67.89",
        supportEmail: "security@learnhub.io",
        platformName: "LearnHub",
    });
    console.log("Subject:", r.subject);

    const c = passwordChangedEmail({
        userName: "Aanya Sharma",
        device: "Chrome on Windows 11",
        ipAddress: "103.45.67.89",
        loginUrl: "https://learnhub.io/login",
        supportEmail: "security@learnhub.io",
        platformName: "LearnHub",
    });
    console.log("Subject:", c.subject);
}
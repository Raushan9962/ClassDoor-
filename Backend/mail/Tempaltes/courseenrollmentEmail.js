/**
 * courseEnrollmentEmail.js
 * Generates professional HTML email for course enrollment confirmation.
 * Usage: courseEnrollmentEmail({ userName, courseName, courseId, startDate, instructorName, duration, supportEmail })
 */

const courseEnrollmentEmail = ({
    userName = "Student",
    courseName = "Your Course",
    courseId = "N/A",
    startDate = "TBD",
    instructorName = "Instructor",
    duration = "N/A",
    dashboardUrl = "https://yourplatform.com/dashboard",
    supportEmail = "support@yourplatform.com",
    logoUrl = "https://yourplatform.com/logo.png",
    platformName = "LearnHub",
}) => {
    const subject = `🎓 You're enrolled in "${courseName}" — Let's get started!`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Course Enrollment Confirmation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', Arial, sans-serif;
      background-color: #f0f4f8;
      color: #1a202c;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 620px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }

    /* ── Header ── */
    .header {
      background: linear-gradient(135deg, #1a56db 0%, #0e3fa0 100%);
      padding: 40px 48px 36px;
      text-align: center;
    }
    .header img { height: 36px; margin-bottom: 24px; }
    .header-badge {
      display: inline-block;
      background: rgba(255,255,255,0.15);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 100px;
      margin-bottom: 16px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 26px;
      font-weight: 700;
      line-height: 1.3;
    }

    /* ── Body ── */
    .body { padding: 40px 48px; }
    .greeting {
      font-size: 16px;
      color: #4a5568;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .greeting strong { color: #1a202c; }

    /* ── Course Card ── */
    .course-card {
      background: #f7faff;
      border: 1px solid #dbeafe;
      border-radius: 12px;
      padding: 28px;
      margin: 28px 0;
    }
    .course-card .course-title {
      font-size: 18px;
      font-weight: 700;
      color: #1a56db;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid #dbeafe;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 0;
      font-size: 14px;
      border-bottom: 1px solid #e8f0fe;
    }
    .detail-row:last-child { border-bottom: none; }
    .detail-label {
      color: #718096;
      font-weight: 500;
    }
    .detail-value {
      color: #1a202c;
      font-weight: 600;
      text-align: right;
    }

    /* ── CTA ── */
    .cta-section { text-align: center; margin: 32px 0 24px; }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #1a56db, #0e3fa0);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 14px 40px;
      border-radius: 8px;
      letter-spacing: 0.3px;
    }

    /* ── Tips ── */
    .tips-section {
      background: #fffbeb;
      border-left: 4px solid #f6ad55;
      border-radius: 0 8px 8px 0;
      padding: 18px 20px;
      margin: 28px 0;
    }
    .tips-section h3 {
      font-size: 13px;
      font-weight: 700;
      color: #b7791f;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 10px;
    }
    .tips-section ul {
      padding-left: 18px;
      color: #744210;
      font-size: 13.5px;
      line-height: 1.7;
    }

    /* ── Footer ── */
    .footer {
      background: #f7faff;
      border-top: 1px solid #e2e8f0;
      padding: 28px 48px;
      text-align: center;
    }
    .footer p {
      font-size: 12.5px;
      color: #718096;
      line-height: 1.7;
      margin-bottom: 6px;
    }
    .footer a { color: #1a56db; text-decoration: none; }
    .footer .divider {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 16px 0;
    }

    @media (max-width: 600px) {
      .wrapper { margin: 0; border-radius: 0; }
      .header, .body, .footer { padding: 28px 24px; }
      .detail-row { flex-direction: column; align-items: flex-start; gap: 2px; }
      .detail-value { text-align: left; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <img src="${logoUrl}" alt="${platformName} Logo" />
      <div class="header-badge">Enrollment Confirmed</div>
      <h1>You're officially enrolled!</h1>
    </div>

    <!-- Body -->
    <div class="body">
      <p class="greeting">
        Hi <strong>${userName}</strong>,<br/><br/>
        Welcome aboard! Your enrollment in the course below has been confirmed.
        Everything you need to get started is right here.
      </p>

      <!-- Course Details Card -->
      <div class="course-card">
        <div class="course-title">📘 ${courseName}</div>
        <div class="detail-row">
          <span class="detail-label">Course ID</span>
          <span class="detail-value">${courseId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Instructor</span>
          <span class="detail-value">${instructorName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Start Date</span>
          <span class="detail-value">${startDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration</span>
          <span class="detail-value">${duration}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status</span>
          <span class="detail-value" style="color:#22c55e;">✅ Active</span>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <a href="${dashboardUrl}" class="cta-btn">Go to My Dashboard →</a>
      </div>

      <!-- Tips -->
      <div class="tips-section">
        <h3>💡 Before you begin</h3>
        <ul>
          <li>Check your dashboard for the full course schedule.</li>
          <li>Download materials in advance for offline access.</li>
          <li>Introduce yourself in the course discussion forum.</li>
          <li>Set a weekly learning goal to stay on track.</li>
        </ul>
      </div>

      <p style="font-size:14px; color:#4a5568; line-height:1.7;">
        Questions? Reach our support team at
        <a href="mailto:${supportEmail}" style="color:#1a56db;">${supportEmail}</a> — we're happy to help.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>You're receiving this because you enrolled on <strong>${platformName}</strong>.</p>
      <hr class="divider"/>
      <p>
        <a href="#">Unsubscribe</a> &nbsp;·&nbsp;
        <a href="#">Privacy Policy</a> &nbsp;·&nbsp;
        <a href="#">Help Center</a>
      </p>
      <p style="margin-top:8px;">© ${new Date().getFullYear()} ${platformName}. All rights reserved.</p>
    </div>

  </div>
</body>
</html>
  `.trim();

    const text = `
Hi ${userName},

You're enrolled in "${courseName}"!

Course Details:
  - Course ID   : ${courseId}
  - Instructor  : ${instructorName}
  - Start Date  : ${startDate}
  - Duration    : ${duration}
  - Status      : Active

Access your course: ${dashboardUrl}

Need help? Contact us at ${supportEmail}

© ${new Date().getFullYear()} ${platformName}
  `.trim();

    return { subject, html, text };
};

module.exports = courseEnrollmentEmail;


// ── Quick test ──────────────────────────────────────────────────────────────
if (require.main === module) {
    const email = courseEnrollmentEmail({
        userName: "Aanya Sharma",
        courseName: "Full-Stack Web Development Bootcamp",
        courseId: "FS-2024-001",
        startDate: "June 15, 2024",
        instructorName: "Rahul Mehta",
        duration: "12 Weeks",
        dashboardUrl: "https://learnhub.io/dashboard",
        supportEmail: "support@learnhub.io",
        platformName: "LearnHub",
    });

    console.log("Subject:", email.subject);
    console.log("Plain text preview:\n", email.text);
}
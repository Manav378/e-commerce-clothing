export const verifyEmailTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to TRENDCASA</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 10px">

        <!-- Main Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.08)">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding:25px;background:#4f46e5;border-radius:10px 10px 0 0">
              <h1 style="color:#ffffff;margin:0;font-size:26px;letter-spacing:1px">
                TRENDCASA
              </h1>
              <p style="color:#e0e7ff;margin:6px 0 0;font-size:13px">
                Your Smart Shopping Partner
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px;color:#111827">
              <h2 style="margin-top:0">Hello ${name} 👋</h2>

              <p style="font-size:15px;line-height:1.6;color:#374151">
                Welcome to <b>TRENDCASA</b>! We are excited to have you on board. Start exploring and enjoy your shopping experience.
              </p>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0">

              <p style="font-size:12px;color:#9ca3af;text-align:center">
                © ${new Date().getFullYear()} TRENDCASA. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;

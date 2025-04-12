const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();

sgMail.setApiKey("YOUR_SENDGRID_API_KEY"); // Replace with your key

app.use(express.json());

app.post("/webhook", (req, body) => {
  const { paymentId, email } = req.body; // From PayPal/Stripe webhook
  const token = Math.random().toString(36).substring(2, 15);
  const msg = {
    to: email,
    from: "YOUR_EMAIL", // Replace with your verified email
    subject: "Your Sleep Haven Guide",
    html: `
            <table style="width: 100%; max-width: 600px; margin: auto; font-family: 'DM Sans', sans-serif;">
                <tr>
                    <td style="background: #947bc5; padding: 20px; text-align: center;">
                        <img src="YOUR_LOGO_URL" alt="Sleep Haven Logo" style="width: 200px;">
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; color: #6b3793;">
                        <h2 style="font-family: 'The Youngest Serif', serif;">Thank You for Choosing Sleep Haven!</h2>
                        <p>Your guide is ready to help you reclaim your nights. Click below to download (link valid for 24 hours):</p>
                        <a href="YOUR_SITE_URL/assets/sleep-haven.pdf?token=${token}" style="display: inline-block; background: #947bc5; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Now</a>
                        <p>Issues? Reach us at [your email]. Sweet dreams!</p>
                    </td>
                </tr>
            </table>
        `,
  };
  sgMail.send(msg).catch(console.error);
});

app.listen(3000, () => console.log("Server running"));

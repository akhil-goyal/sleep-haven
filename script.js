// Stripe Setup
const stripe = Stripe("YOUR_STRIPE_PUBLISHABLE_KEY"); // Replace with your key
const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element"); // Add if using custom Stripe form

document.getElementById("stripeButton").addEventListener("click", async () => {
  const { error, paymentIntent } = await stripe.redirectToCheckout({
    lineItems: [
      {
        price: "YOUR_STRIPE_PRICE_ID", // Replace with your price ID
        quantity: 1,
      },
    ],
    mode: "payment",
    successUrl:
      window.location.origin + "/thank-you.html?token=" + generateToken(),
    cancelUrl: window.location.origin,
  });
  if (error) console.error(error);
});

// Form Validation
document.getElementById("signupForm").addEventListener("submit", (e) => {
  const email = document.getElementById("emailInput").value;
  if (!email.includes("@")) {
    e.preventDefault();
    alert("Please enter a valid email.");
  }
});

// Generate Token for PDF Link
function generateToken() {
  return Math.random().toString(36).substring(2, 15); // Simple token, replace with secure one later
}

// Set Download Link Expiry
document.getElementById("downloadLink")?.addEventListener("click", () => {
  setTimeout(() => {
    document.getElementById("downloadLink").href = "#";
    alert("Download link expired. Contact us for a new one.");
  }, 24 * 60 * 60 * 1000); // 24 hours
});

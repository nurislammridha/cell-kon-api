const mongoose = require("mongoose");
const mailSender = require('../utils/mailSender')
const ForgetOtpEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 2, // The document will be automatically deleted after 5 minutes of its creation time
  },

});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  // Send the email using our custom mailSender Function
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email for create new password",
      `<h1>Please confirm your OTP to reset old password and create new</h1>
             <p> here is your OTP code:-> ${otp} </p>
            `
    );
    // console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    // console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

ForgetOtpEmailSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = ForgetOtpEmail = mongoose.model("ForgetOtpEmail", ForgetOtpEmailSchema);

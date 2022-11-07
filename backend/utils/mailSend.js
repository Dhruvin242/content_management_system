const nodemailer = require("nodemailer");

exports.mailer = (email, data) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  let mailDetails = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Reset Password OTP",
    text: `This is your OTP : ${data} OTP is valied for only 10 Minutes and Please Don't Share OTP with anyone.`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};

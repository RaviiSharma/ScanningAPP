

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const sendBulkMail= async (EMAILID,USERNAME) => {
  try {
    // let EMAILID = req.body.intro;
    console.log("EMAILID", EMAILID);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "engineerravi036@gmail.com",
        pass: "jqnsxdeoiesptqhk"
      }
    });

    // Create the email content using Mailgen
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Recharge Kit Fintech Pvt Ltd",
        link: "https://rechargkit.com/"
      }
    });

    const email = {
      from: "engineerravi036@gmail.com", 
      to: EMAILID, 
      subject: "Purchase Status 1", 
      html: mailGenerator.generate({
        body: {
          intro: `${USERNAME}`,
          outro: "Congratulations, your item successfully buy",
        }
      })
    };

    // Send the email
    transporter.sendMail(email, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ error });
      } else {
        console.log("Email sent successfully:", info);
        return res.status(200).json({ msg: "Email successfully sent to all" });
      }
    });

  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = sendBulkMail; 

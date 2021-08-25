const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.post("/api/send", (req, res) => {
  const { email, subject, name, deployedLink, githubLink, message } = req.body;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: `${email}`, // Change to your recipient
      from: "josephlynn.dev@gmail.com", // Change to your verified sender
      subject: `${subject}`,
      text: `Sent from: ${email}`,
      html: `<p>${message}</p>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Github Link:</strong> <a href=${githubLink} target="_blank">${githubLink}</a></p>
      <p><strong>Deployed Link:</strong> <a href=${deployedLink} target="_blank">${deployedLink}</a></p>`,
    };
    sgMail
      .send(msg)
      .then((data) => {
        console.log("Email sent");
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    res.status(200).json({
      message:
        "Your submission was successful! I will typically get back to you within 24 hours. Thank you!",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "An error has occured while trying to submit your information. Please try again.",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    name: "",
    deployedLink: "",
    githubLink: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const userSubmission = {
      email: formData.email,
      subject: formData.subject,
      name: formData.name,
      deployedLink: formData.deployedLink,
      githubLink: formData.githubLink,
      message: formData.message,
    };

    axios
      .post("https://sparky-bubblynet.herokuapp.com/api/send", userSubmission)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="toEmail">
        <Form.Label>Send Email To</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Email subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          placeholder="Enter email subject"
          value={formData.subject}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Sender Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="deployedLink">
        <Form.Label>Deployed Link</Form.Label>
        <Form.Control
          type="text"
          name="deployedLink"
          placeholder="Deployed link"
          value={formData.deployedLink}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="codeLink">
        <Form.Label>Github Link</Form.Label>
        <Form.Control
          type="text"
          name="githubLink"
          placeholder="GitHub link"
          value={formData.githubLink}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          name="message"
          placeholder="Enter Message"
          value={formData.message}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ContactForm;

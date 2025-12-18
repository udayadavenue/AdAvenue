import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  resize: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    background: gray;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #22c55e;
  color: white;
  padding: 16px 22px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  animation: slideIn 0.5s ease forwards;

  @keyframes slideIn {
    from {
      transform: translateX(120%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Contact = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    from_email: "",
    from_name: "",
    subject: "",
    from_phone: "",
    message: "",
  });

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    // TEMP: show popup immediately to verify animation works
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    if (!isFormValid) return;

    emailjs
      .sendForm(
        "service_wexk0wd",
        "template_fa2fb77",
        form.current,
        "5qQw0nLaDIK7x44Sc"
      )
      .then(() => {
        form.current.reset();
        setFormData({
          from_email: "",
          from_name: "",
          subject: "",
          from_phone: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
      });
  };

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Feel free to reach out to Us for Quotations And Free Review Report for
          your Brand!
        </Desc>

        <ContactForm ref={form} onSubmit={handelSubmit}>
          <ContactTitle>Work With Us 🚀</ContactTitle>

          <ContactInput
            placeholder="Email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
          />

          <ContactInput
            placeholder="Name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
          />

          <ContactInput
            placeholder="Brand Name"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <ContactInput
            placeholder="Phone Number"
            name="from_phone"
            value={formData.from_phone}
            onChange={handleChange}
          />

          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />

          <ContactButton type="submit" disabled={!isFormValid}>
            Send
          </ContactButton>
        </ContactForm>
      </Wrapper>

      {showPopup && <Popup>✅ Message Sent Successfully!</Popup>}
    </Container>
  );
};


export default Contact;

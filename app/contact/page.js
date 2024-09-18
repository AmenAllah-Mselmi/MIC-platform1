"use client";

import { useState } from "react";
import "./contact.scss";
import { Inter } from "next/font/google";
import { toast, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"], weight: ["600", "400", "500"] });

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    if (!Object.values(form).every((value) => value !== "")) {
      toast.error("Please fill all the fields", {
        position: "bottom-center",
      });
      return;
    }
    setLoading(true);
    console.log("form submitted", form);
    setTimeout(() => {
      toast.success("Message Sent! Thank You.", {
        position: "bottom-center",
      });
      setLoading(false);
    }, 1000);
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  console.log("loading is ", loading);
  return (
    <div id="contact" className={inter.className}>
      <ToastContainer />
      <div className="container">
        <div className="title">
          <h1 data-aos="fade-up">Contact Us</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Let us know what you need and we will get back to you in no time.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="form">
          <div className="firstname">
            <label htmlFor="firstname">First name</label>
            <input
              placeholder="John"
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) => handleChange(e)}
              value={form.firstname}
            />
          </div>
          <div className="lastname">
            <label htmlFor="lastname">Last name</label>
            <input
              placeholder="Doe"
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => handleChange(e)}
              value={form.lastname}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email Address</label>
            <input
              placeholder="john.doe@example.com"
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleChange(e)}
              value={form.email}
            />
          </div>
          <div className="subject">
            <label htmlFor="subject">Subject</label>
            <input
              placeholder="Subject Name"
              type="text"
              name="subject"
              id="subject"
              onChange={(e) => handleChange(e)}
              value={form.subject}
            />
          </div>
          <div className="message">
            <label htmlFor="message">Message</label>
            <textarea
              className={inter.className}
              name="message"
              id="message"
              placeholder="Your message..."
              cols="30"
              rows="5"
              onChange={(e) => handleChange(e)}
              value={form.message}
            ></textarea>
          </div>
          <div className="submit">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className={inter.className}
            >
              Send Message
            </button>
            {/* <div className="message">Message Sent! Thank You.</div> */}
            {loading && <div className="loading"></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

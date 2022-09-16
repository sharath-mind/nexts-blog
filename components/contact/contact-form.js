import { useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
import { useEffect } from "react";

const sendContactData = async (contactDetails) => {
  const response = await fetch("api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/JSON",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState({});
  const [requestErrorStatus, setRequestErrorStatus] = useState("")

  useEffect(() => {
    if(requestStatus === "success" || requestStatus === "error"){
      const timer = setTimeout(() => {
        setRequestErrorStatus(null);
        setRequestStatus(null)
      }, 3000);
      return ()=> clearTimeout(timer);
    }
  }, [requestStatus])
  

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({ email, name, message });
      setRequestStatus("success");
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      setRequestErrorStatus(error.message)
      setRequestStatus("error");
    }
  };

  let notificationData;

  if(requestStatus === "pending"){
    notificationData = {
      status: requestStatus,
      title: "Sending message...",
      message: "Your message is on it's way!"
    }
  }

  if(requestStatus === "success"){
    notificationData = {
      status: requestStatus,
      title: "Success!",
      message: "Message sent successfully! yuhoooooooo!!!!"
    }
  }

  if(requestStatus === "error"){
    notificationData = {
      status: requestStatus,
      title: "Error!",
      message: requestErrorStatus
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help yuo?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            rows={5}
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {
        notificationData && <Notification {...notificationData} />
      }
    </section>
  );
};

export default ContactForm;

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3pnlv1v",
        "template_y7i3laa",
        form.current,
        "awQ0YCKLgyw1olItJ"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Header />
  <div className="md:py-10 py-0">
      <div className="md:px-48 px-6 pt-20 pb-10">
        <h1 className="md:text-4xl md:hidden block text-3xl pb-4 font-semibold leading-snug">
          Get in touch with the UK's leading estate agent for a
          consultation
        </h1>
        <h1 className="md:text-4xl hidden md:block text-3xl pb-4 font-semibold leading-snug">
          Get in touch with the UK's leading estate <br /> agent for a
          consultation
        </h1>
       
      </div>
      <div className="md:px-48 px-6">
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 w-full">
                <p className="pb-1 font-medium text-base">First Name</p>
                <input
                  name="user_email"
                  type="email"
                  className="w-full bg-background outline-1 focus:outline-lightblue rounded p-3"
                />
              </div>
              <div className="md:w-1/2 w-full">
                <p className="pb-1 font-medium text-base">Last Name</p>
                <input
                  name="user_email"
                  type="email"
                  className="w-full bg-background outline-1 focus:outline-lightblue rounded p-3"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 w-full">
                <p className="pb-1 font-medium text-base">Email Address</p>
                <input
                  name="user_email"
                  type="email"
                  className="w-full bg-background outline-1 focus:outline-lightblue rounded p-3"
                />
              </div>
              <div className="md:w-1/2 w-full">
                <p className="pb-1 font-medium text-base">Phone Number</p>
                <input
                  name="user_email"
                  type="email"
                  className="w-full bg-background outline-1 focus:outline-lightblue rounded p-3"
                />
              </div>
            </div>
            <div>
              <p className="pb-1 font-medium text-base">Massage</p>
              <textarea
                rows="6"
                name="user_email"
                type="email"
                className="w-full bg-background outline-1 focus:outline-lightblue rounded p-3"
              />
            </div>
          </div>
          <div className="flex ">
            <button className="mt-8  w-1/2 flex justify-center font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue">
              Send Message
            </button>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

"use client";

import { useState } from "react";
import contactImage from "@/assets/contac-img.webp";
import { sanitizeInput, sanitizeContactForm, isRateLimited } from "@/lib/security";

type ContactSectionProps = {
  image?: string;
  showImage?: boolean;
  className?: string;
};

const defaultImage = contactImage.src;

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  if (!values.consent) errors.consent = "You must agree to the privacy policy.";
  return errors;
}

// --- MAIN EXPORT COMPONENT ---
// Connect with the locals
export default function ContactSectionWithShader({ image = defaultImage, showImage = true, className = '' }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    const target = e.target as HTMLInputElement;
    const newValue = target.type === 'checkbox' ? target.checked : sanitizeInput(value);
    setValues((prev) => ({ ...prev, [id]: newValue }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRateLimited("contact-form", 5, 60_000)) {
      setRateLimited(true);
      return;
    }
    const sanitizedValues = sanitizeContactForm(values);
    setValues(sanitizedValues);
    const nextErrors = validate(sanitizedValues);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const inputClass = (field: keyof FormValues) =>
    `block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black shadow-sm ring-1 shadow-black/10 placeholder:text-gray-400 focus:ring-2 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 ${
      errors[field]
        ? "ring-red-500 focus:ring-red-500"
        : "ring-black/10 focus:ring-neutral-400 dark:ring-white/5"
    }`;

  return (
    <div className={`w-full dark:bg-neutral-900 ${className}`} style={{ backgroundColor: 'var(--color-bg, #F5F2EB)' }}>
      <div className={`mx-auto grid max-w-[1300px] gap-8 px-0 py-10 md:px-10 lg:py-20 ${showImage ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 place-items-center'}`}>
        
        {/* Left Column - Single static image */}
        {showImage && (
        <div className="order-last h-[500px] overflow-hidden rounded-3xl md:order-first lg:h-auto">
          <img
            src={image}
            alt="Contact us"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        )}

        {/* Right Column - Contact Form */}
        <div className={`flex items-center justify-center ${!showImage ? 'w-full' : ''}`}>
          <div className={`w-full ${!showImage ? 'w-full p-[35px] rounded-[10px] bg-white shadow-sm' : 'max-w-lg rounded-3xl px-4 py-8 md:px-10'}`}>
            <div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-black dark:text-white leading-9">
                Let's Talk
              </h1>
              <p className="mt-4 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
                Let's start a conversation by filling out the form below or sending an email to{" "}
                <a href="mailto:voyaflair@gmail.com" className="text-blue-600 dark:text-red-400 font-medium">
                  voyaflair@gmail.com
                </a>
              </p>
            </div>

            <div className="py-10">
              {rateLimited ? (
                <div className="rounded-md bg-red-50 p-4 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  Too many submissions. Please wait a minute before trying again.
                </div>
              ) : submitted ? (
                <div className="rounded-md bg-green-50 p-4 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  Thanks! Your message has been sent.
                </div>
              ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Input: Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 leading-6">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="name" type="text" value={values.name} onChange={handleChange} placeholder="Manu Arora" aria-invalid={!!errors.name} className={inputClass("name")} />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Input: Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 leading-6">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="email" type="email" value={values.email} onChange={handleChange} placeholder="hello@johndoe.com" aria-invalid={!!errors.email} className={inputClass("email")} />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Input: Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 leading-6">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="subject" type="text" value={values.subject} onChange={handleChange} placeholder="How can we help?" aria-invalid={!!errors.subject} className={inputClass("subject")} />
                  </div>
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                {/* Input: Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 leading-6">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <textarea rows={5} id="message" value={values.message} onChange={handleChange} placeholder="Enter your message here" aria-invalid={!!errors.message} className={inputClass("message")} />
                  </div>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                {/* Privacy Consent Checkbox */}
                <div>
                  <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    <div className="flex h-5 items-center">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-500 cursor-pointer dark:border-neutral-600 dark:text-white dark:focus:ring-white"
                      />
                    </div>
                    <span className="select-none">
                      I authorize Voyaflair to store and use the personal data sent, so that they can respond to my request. My personal data will be processed in accordance with the information in the section{' '}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">
                        Privacy Policy
                      </a>.
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
                </div>

                {/* Button: Submit */}
                <div className="mt-8">
                  <button type="submit" className="relative z-10 flex w-full items-center justify-center rounded-full bg-black px-4 py-4 text-sm font-medium text-white transition duration-200 hover:bg-black/90 md:text-sm dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl">
                    Submit
                  </button>
                </div>
              </form>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
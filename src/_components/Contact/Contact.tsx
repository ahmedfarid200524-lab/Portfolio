"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi";

type Values = { name: string; email: string; subject: string; message: string; website: string };
type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMPTY: Values = { name: "", email: "", subject: "", message: "", website: "" };

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/ahmedfarid200524-lab" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-farid-708791369" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/ahmedfaariid" },
  { icon: SiUpwork, label: "Upwork", href: "https://www.upwork.com/freelancers/~010cd2ebb61191a7c2" },
];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email.";
  if (v.subject.trim().length < 3) e.subject = "Please add a subject.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

/* ---------- Floating-label field with animated underline ---------- */

type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  item: Variants;
  line: Variants;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
};

function Field({
  id, label, value, error, item, line, onChange, onBlur,
  type = "text", autoComplete, multiline, className = "",
}: FieldProps) {
  const shared = {
    id,
    placeholder: " ",
    value,
    onChange,
    onBlur,
    required: true,
    autoComplete,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "peer w-full bg-transparent pb-3 pt-7 text-lg text-neutral-900 outline-none placeholder:text-transparent dark:text-white",
  };

  return (
    <motion.div variants={item} className={`relative ${className}`}>
      {multiline ? (
        <textarea rows={4} {...shared} className={`${shared.className} resize-none`} />
      ) : (
        <input type={type} {...shared} />
      )}

      {/* Floating label */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-0 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-neutral-900 dark:peer-focus:text-white"
      >
        {label}
      </label>

      {/* Base underline (draws in on scroll) */}
      <motion.span
        variants={line}
        aria-hidden
        className={`absolute bottom-0 left-0 h-px w-full origin-left ${
          error ? "bg-red-500" : "bg-neutral-300 dark:bg-white/25"
        }`}
      />
      {/* Focus underline (sweeps across on focus) */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out peer-focus:scale-x-100 dark:bg-white"
      />

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="pt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Magnetic outlined button with fill sweep ---------- */

function SubmitButton({ loading, reduce }: { loading: boolean; reduce: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16 });
  const y = useSpring(my, { stiffness: 220, damping: 16 });

  return (
    <motion.button
      type="submit"
      data-cursor
      disabled={loading}
      style={{ x, y }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      className="group relative inline-flex items-center overflow-hidden rounded-sm border border-neutral-900/70 px-8 py-4 text-base text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/70 dark:text-white"
    >
      {/* Fill sweep */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-disabled:translate-x-[-100%] dark:bg-white"
      />
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white dark:group-hover:text-neutral-900">
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <HiArrowRight
              className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1.5"
              aria-hidden
            />
          </>
        )}
      </span>
    </motion.button>
  );
}

/* ---------- Main section ---------- */

export default function Contact() {
  const uid = useId();
  const reduce = !!useReducedMotion();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const line: Variants = {
    hidden: { scaleX: reduce ? 1 : 0 },
    show: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  const wordReveal: Variants = {
    hidden: { y: reduce ? 0 : "110%" },
    show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const divider: Variants = {
    hidden: { scaleY: reduce ? 1 : 0 },
    show: { scaleY: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  const change =
    (key: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key as keyof Errors]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const blur = (key: keyof Errors) => () =>
    setErrors((er) => ({ ...er, [key]: validate(values)[key] }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby={`${uid}-title`}
      className="bg-white py-32 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid w-[90%] max-w-none gap-12 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,2fr)] md:gap-20"
      >
        {/* Left column */}
        <div>
          <motion.p variants={item} className="text-sm uppercase tracking-[0.2em]">
            Contact
          </motion.p>

          <h2
            id={`${uid}-title`}
            className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {["Let’s Work", "Together."].map((l) => (
              <span key={l} className="block overflow-hidden pb-1">
                <motion.span variants={wordReveal} className="block">
                  {l}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            variants={item}
            className="mt-6 max-w-sm text-base leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            Available for freelance work, collaborations, and exciting creative projects.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex items-center gap-8">
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={reduce ? undefined : { y: -4, rotate: -6, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="text-neutral-700 transition-colors hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:text-neutral-300 dark:hover:text-white"
              >
                <Icon className="h-7 w-7" aria-hidden />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider (draws downward) */}
        <motion.div
          variants={divider}
          aria-hidden
          className="hidden origin-top bg-neutral-300 md:block dark:bg-white/20"
        />

        {/* Form side */}
        <div className="relative min-h-[26rem]">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[26rem] flex-col items-start justify-center"
              >
                <svg
                  viewBox="0 0 52 52"
                  className="h-20 w-20 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <motion.circle
                    cx="26" cy="26" r="24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M15 27l8 8 14-16"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
                <h3 className="mt-6 text-3xl font-medium tracking-tight">Message sent.</h3>
                <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
                  Thanks for reaching out. I’ll get back to you soon.
                </p>
                <button
                  type="button"
                  data-cursor
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-base underline underline-offset-4 hover:opacity-70"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                exit={{ opacity: 0, y: -12 }}
                className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2"
              >
                <Field
                  id={`${uid}-name`} label="Name" autoComplete="name"
                  value={values.name} error={errors.name} item={item} line={line}
                  onChange={change("name")} onBlur={blur("name")}
                />
                <Field
                  id={`${uid}-email`} label="Email" type="email" autoComplete="email"
                  value={values.email} error={errors.email} item={item} line={line}
                  onChange={change("email")} onBlur={blur("email")}
                />
                <Field
                  id={`${uid}-subject`} label="Subject" className="sm:col-span-2"
                  value={values.subject} error={errors.subject} item={item} line={line}
                  onChange={change("subject")} onBlur={blur("subject")}
                />
                <Field
                  id={`${uid}-message`} label="Message" multiline className="sm:col-span-2"
                  value={values.message} error={errors.message} item={item} line={line}
                  onChange={change("message")} onBlur={blur("message")}
                />

                {/* Honeypot: hidden from people, bots fill it in */}
                <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={change("website")}
                    />
                  </label>
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-base text-red-600 sm:col-span-2 dark:text-red-400"
                    >
                      Something went wrong. Please try again or email me directly.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div variants={item} className="sm:col-span-2">
                  <SubmitButton loading={status === "loading"} reduce={reduce} />
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
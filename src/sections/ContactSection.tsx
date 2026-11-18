import { useState, type FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { personalInfo } from '../data/personalInfo';

// Contact form state type
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // NOTE: No backend is configured. This simulates a submission.
    // To make this functional, integrate with EmailJS, Formspree, or a backend API.
    // Example: await emailjs.send(serviceId, templateId, form, publicKey);
    await new Promise((r) => setTimeout(r, 1200)); // Simulated delay

    // Show "not configured" message — honest UX
    setStatus('error');
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-2.5 text-sm rounded-lg border transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:border-red-400'
        : 'border-slate-200 bg-white hover:border-slate-300 focus:border-[#2563eb]'
    }`;

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        title="Contact"
        subtitle="Have a question or want to collaborate? Reach out!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <div className="space-y-5">
          <p className="text-slate-600 text-sm leading-relaxed">
            I&apos;m always open to interesting conversations, collaboration
            opportunities, and new ideas. Whether you have a project in mind or
            just want to connect — feel free to reach out through any of the
            channels below.
          </p>

          {/* Contact methods */}
          <div className="space-y-3">
            <ContactLink
              icon={<Mail size={16} />}
              label="Email"
              value={personalInfo.email}
              href={`mailto:${personalInfo.email}`}
              note="Replace with your actual email"
            />
            <ContactLink
              icon={<FaGithub size={16} />}
              label="GitHub"
              value={`@${personalInfo.githubUsername}`}
              href={personalInfo.github}
            />
            <ContactLink
              icon={<FaLinkedin size={16} />}
              label="LinkedIn"
              value="Connect on LinkedIn"
              href={personalInfo.linkedin}
              note="Replace with your actual LinkedIn URL"
            />
          </div>
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass('name')}
                  disabled={status === 'submitting'}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass('email')}
                  disabled={status === 'submitting'}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={inputClass('subject')}
                  disabled={status === 'submitting'}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className={`${inputClass('message')} resize-none`}
                  disabled={status === 'submitting'}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback messages */}
              {status === 'success' && (
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex flex-col gap-2 p-3.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">
                        Direct delivery service not connected
                      </p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        To ensure your message reaches me immediately, click below to open your preferred email client with your message pre-filled.
                      </p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
                      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
                    )}`}
                    className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] bg-white border border-amber-300 hover:bg-amber-100/50 px-3 py-1.5 rounded-md transition-colors shadow-sm"
                  >
                    <Mail size={13} />
                    <span>Send via Email Client</span>
                  </a>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// ─── Helper component ─────────────────────────────────────────────────────────

interface ContactLinkProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  note?: string;
}

function ContactLink({ icon, label, value, href, note }: ContactLinkProps) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all group bg-slate-50"
    >
      <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[#2563eb] group-hover:border-blue-200 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-[#1e3a5f] truncate">{value}</p>
        {note && <p className="text-xs text-slate-400 italic">{note}</p>}
      </div>
      <ExternalLink size={14} className="text-slate-300 group-hover:text-[#2563eb] transition-colors flex-shrink-0" />
    </a>
  );
}

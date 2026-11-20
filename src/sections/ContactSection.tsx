import { useState, type FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { personalInfo } from '../data/personalInfo';

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
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('error');
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200 bg-[var(--input-bg)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] border ${
      errors[field]
        ? 'border-red-400 focus:border-red-400'
        : 'border-[var(--input-border)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]'
    }`;

  return (
    <SectionWrapper id="contact" alternate>
      <SectionHeader
        title="Get in Touch"
        subtitle="Have a question, collaboration inquiry, or project opportunity? Feel free to reach out."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact info cards */}
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            I am always open to exploring new engineering opportunities, discussing software development, or connecting with fellow engineers. Reach out directly through any of the channels below.
          </p>

          <ContactLink
            icon={<Mail size={16} />}
            label="Email Address"
            value={personalInfo.email}
            href={`mailto:${personalInfo.email}`}
          />
          <ContactLink
            icon={<FaGithub size={16} />}
            label="GitHub Profile"
            value={`@${personalInfo.githubUsername}`}
            href={personalInfo.github}
          />
          <ContactLink
            icon={<FaLinkedin size={16} />}
            label="LinkedIn"
            value="Connect on LinkedIn"
            href={personalInfo.linkedin}
          />
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Full Name <span className="text-[var(--accent)]">*</span>
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
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Email Address <span className="text-[var(--accent)]">*</span>
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
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Subject <span className="text-[var(--accent)]">*</span>
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
                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Message <span className="text-[var(--accent)]">*</span>
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
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-[#00D6A3] to-[#39E6B0] text-[#101613] [data-theme=light]:from-blue-600 [data-theme=light]:to-blue-500 [data-theme=light]:text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#00D6A3]/25 [data-theme=light]:hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-[#101613] [data-theme=light]:border-white border-t-transparent rounded-full" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <p>Message sent successfully! I will get back to you soon.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-400">Direct delivery service not connected</p>
                      <p className="text-[var(--text-secondary)] mt-0.5">Click below to open your email client directly with your message pre-filled:</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
                      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
                    )}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[var(--accent)] bg-[var(--bg-pill)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg hover:bg-[var(--bg-pill-hover)] transition-colors"
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

function ContactLink({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="glass-card p-4 flex items-center gap-3 hover:border-[var(--accent)] transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 [data-theme=light]:bg-blue-50 [data-theme=light]:text-blue-600 [data-theme=light]:border-blue-200 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-muted)] font-medium">{label}</p>
        <p className="text-sm font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
          {value}
        </p>
      </div>
      <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
    </a>
  );
}

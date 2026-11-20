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

  const inputClass = 'w-full px-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-200';

  const inputStyle = (field: keyof FormState): React.CSSProperties => ({
    background: 'var(--color-bg-card)',
    color: 'var(--color-text-primary)',
    border: errors[field]
      ? '1.5px solid #ef4444'
      : '1.5px solid var(--color-border)',
  });

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        title="Contact"
        subtitle="Have a question or want to collaborate? Reach out!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <div className="space-y-5">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
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
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
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
                  className={inputClass}
                  style={inputStyle('name')}
                  disabled={status === 'submitting'}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
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
                  className={inputClass}
                  style={inputStyle('email')}
                  disabled={status === 'submitting'}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={inputClass}
                  style={inputStyle('subject')}
                  disabled={status === 'submitting'}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle('message')}
                  disabled={status === 'submitting'}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
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

              {/* Success feedback */}
              {status === 'success' && (
                <div
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-400">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error / mailto fallback */}
              {status === 'error' && (
                <div
                  className="flex flex-col gap-2 p-3.5 rounded-xl"
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-400">
                        Direct delivery service not connected
                      </p>
                      <p className="text-xs text-amber-300/80 mt-0.5">
                        To ensure your message reaches me immediately, click below to open your preferred email client.
                      </p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
                      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
                    )}`}
                    className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{
                      color: 'var(--color-text-accent)',
                      background: 'var(--color-bg-card)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
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
}

function ContactLink({ icon, label, value, href }: ContactLinkProps) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
        style={{
          background: 'var(--color-accent-soft)',
          color: 'var(--color-text-accent)',
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
          {value}
        </p>
      </div>
      <ExternalLink
        size={14}
        className="flex-shrink-0 transition-colors"
        style={{ color: 'var(--color-text-muted)' }}
      />
    </a>
  );
}

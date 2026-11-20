interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * SectionHeader — consistent heading for each portfolio section.
 * Dark theme with accent gradient underline.
 */
export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <h2 className="section-heading">{title}</h2>
      {subtitle && (
        <p className="mt-6 text-base max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

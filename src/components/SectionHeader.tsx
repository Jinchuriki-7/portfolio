interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * SectionHeader — consistent heading used at the top of each portfolio section.
 */
export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <h2 className="section-heading">{title}</h2>
      {subtitle && (
        <p className="mt-6 text-base text-slate-500 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

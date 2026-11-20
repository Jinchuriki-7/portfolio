interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h2>
      </div>
      <div className="h-1 w-16 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mb-3" />
      {subtitle && (
        <p className="text-[var(--text-muted)] text-sm md:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

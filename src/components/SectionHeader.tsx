interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mb-3" />
      {subtitle && (
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

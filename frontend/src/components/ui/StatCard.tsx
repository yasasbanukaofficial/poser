export interface StatCardProps {
  label: string;
  value: string;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="border-l border-zinc-800 pl-6 py-2">
    <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.2em] mb-1">
      {label}
    </h4>
    <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
  </div>
);

export default StatCard;

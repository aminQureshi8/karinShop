export default function Badge({ title, icon }: any) {
  return (
    <div className="border  border-gray-300 text-gray-400 dark:border-gray-700 rounded-lg p-2 dark:text-gray-400 flex items-center gap-2">
      {icon}
      <p className="text-sm max-sm:text-xs">{title}</p>
    </div>
  );
}

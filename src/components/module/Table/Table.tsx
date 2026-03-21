import { Table } from "@/components/ui/table";

export default function TableLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div>
      <Table dir="rtl">{children}</Table>
    </div>
  );
}

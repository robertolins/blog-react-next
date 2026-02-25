import MenuAdmin from '@/components/admin/MenuAdmin';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostLayout({ children }: AdminPostLayoutProps) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}

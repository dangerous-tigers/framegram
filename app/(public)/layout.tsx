import { ReactNode } from 'react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main>{children}</main>;
}

import { AuthProvider } from 'src/components/AuthProvider';
import createClient from 'src/lib/supabase-server';
import { AuthenticatedLayout } from '@/components/Layout/AuthenticatedLayout';
import { UnAuthenticatedLayout } from '@/components/Layout/UnAuthenticatedLayout';
import 'src/styles/globals.css';

export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang='en' className='h-full'>
      <body className='h-full bg-neutral-100'>
        <div className='flex min-h-screen flex-col'>
          <main className='w-full'>
            <AuthProvider accessToken={accessToken}>
              {accessToken ? (
                <AuthenticatedLayout>{children}</AuthenticatedLayout>
              ) : (
                <UnAuthenticatedLayout>{children}</UnAuthenticatedLayout>
              )}
              {children}
            </AuthProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

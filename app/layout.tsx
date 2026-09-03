import type { Metadata } from 'next';
import { DM_Sans, Syne } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BrandME • Your Brand • Your Web.',
  description:
    'BrandME builds fast, clean and professional websites for small businesses and brands in 7 days or less.',
  keywords: ['build a website for your brand', 'web design for SMEs', 'fast website delivery', 'done for you web design'],
  icons: {
    icon: '/images/logo/brandme-favicon.ico',
    shortcut: '/images/logo/brandme-icon.svg',
  },
  openGraph: {
    title: 'BrandME • Your Brand • Your Web.',
    description: 'A done-for-you web design platform built for SMEs, businesses and emerging brands.',
    url: 'https://brandme.ng',
    siteName: 'BrandME',
    type: 'website',
  },
};

// Real session checker looking at cookies
async function getUserSession() {
  const cookieStore = await cookies();
  
  // Look for your auth token or session cookie name (e.g., 'auth_token', 'session', 'token')
  const sessionCookie = cookieStore.get('auth_token') || cookieStore.get('session');

  // If there's no cookie, the user/admin is logged out
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  // TODO: If you encode user roles inside your token/cookie or database, parse them here.
  // For now, if the cookie exists, check what role they have. 
  // If your login system sets a separate role cookie, check that too:
  const roleCookie = cookieStore.get('user_role')?.value || 'admin'; 

  return {
    isLoggedIn: true,
    role: roleCookie, // 'admin' or 'user'
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserSession();

  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body>
        <SiteChrome user={user}>{children}</SiteChrome>
      </body>
    </html>
  );
}

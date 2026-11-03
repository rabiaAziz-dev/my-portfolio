import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swe-rabia-aziz.vercel.app'),
  title: {
    default: 'Rabia Aziz | Flutter Developer & Mobile App Engineer',
    template: '%s | Rabia Aziz',
  },
  description:
    'Portfolio of Rabia Aziz — Flutter Developer specializing in AI-powered mobile apps, Supabase backends, and cross-platform architecture.',
  applicationName: 'Rabia Aziz Portfolio',
  authors: [{ name: 'Rabia Aziz', url: 'https://swe-rabia-aziz.vercel.app' }],
  generator: 'Next.js',
  keywords: [
    'Rabia Aziz',
    'Flutter Developer',
    'Mobile App Developer',
    'Flutter Engineer',
    'Cross-Platform Developer',
    'Supabase Developer',
    'Firebase Developer',
    'Dart Developer',
    'AI Mobile Apps',
    'CivicCoach',
    'ZenPeace',
    'Zemen App',
    'Health Tracker',
    'Mobile Application Engineer Pakistan',
    'Remote Flutter Developer',
    'Android Developer',
    'iOS Developer',
  ],
  creator: 'Rabia Aziz',
  publisher: 'Rabia Aziz',
  alternates: {
    canonical: 'https://swe-rabia-aziz.vercel.app',
  },
  icons: {
    icon: [
      { url: '/images/Logo.png' },
      { url: '/images/Logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/Logo.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://swe-rabia-aziz.vercel.app',
    siteName: 'Rabia Aziz Portfolio',
    title: 'Rabia Aziz | Flutter Developer & Mobile App Engineer',
    description:
      'Cross-platform Flutter developer building AI mobile apps and Supabase backends across mobile, web, and desktop.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rabia Aziz — Flutter Developer & Mobile App Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rabia Aziz | Flutter Developer & Mobile App Engineer',
    description:
      'Cross-platform Flutter developer building AI mobile apps and Supabase backends across mobile, web, and desktop.',
    images: ['/images/og-image.png'],
    creator: '@rabiaaziz456',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                function shouldSuppress(msg, file, stack) {
                  var m = String(msg || '');
                  var f = String(file || '');
                  var s = String(stack || '');
                  return (
                    f.indexOf('chrome-extension://') !== -1 ||
                    f.indexOf('moz-extension://') !== -1 ||
                    s.indexOf('chrome-extension://') !== -1 ||
                    s.indexOf('moz-extension://') !== -1 ||
                    m.indexOf('M_ID') !== -1 ||
                    s.indexOf('M_ID') !== -1 ||
                    f.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                    s.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1
                  );
                }
                window.addEventListener('error', function(e) {
                  try {
                    var msg = e.message || (e.error && e.error.message);
                    var file = e.filename || (e.error && e.error.fileName);
                    var stack = e.error && e.error.stack;
                    if (shouldSuppress(msg, file, stack)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                      return true;
                    }
                  } catch (_) {}
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  try {
                    var reason = e.reason;
                    var msg = reason && (reason.message || reason);
                    var stack = reason && reason.stack;
                    if (shouldSuppress(msg, '', stack)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                    }
                  } catch (_) {}
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SWE.Rabia Aziz',
  description: 'Portfolio of Rabia Aziz - Flutter Developer specializing in cross-platform applications with clean design and strong performance',
  icons: {
    icon: 'images/Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
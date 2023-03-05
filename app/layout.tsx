import Image from "next/image";
import Link from "next/link";
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = (
    <header>
      <div className="text-center bg-slate-800 p-2 my-6 rounded-md">
        <Image src="/next.svg" width={40} height={40} className="mx-auto invert" alt={"logo"} />
        <Link href="/">
          <h1 className="text-2xl text-white font-bold mt-4">xBlog</h1>
        </Link>

        <Link href="/">
          <button className="btn btn-info rounded-xl normal-case mt-2">⬅ Back</button>
        </Link>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="border-t border-slate-400 mt-12 py-6 text-center text-slate-400">
        <h3>Designed by XEM</h3>
      </div>
    </footer>
  );

  return (
    <html data-theme='black'>
      <body>
        <div className="mx-auto max-w-2xl px-6">
          {header}
          {children}
          {footer}
        </div>
      </body>
    </html>
  )
}

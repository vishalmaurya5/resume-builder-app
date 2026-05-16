import React from 'react'

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <footer className="mt-40 flex flex-wrap justify-center gap-10 overflow-hidden bg-gradient-to-r from-white via-green-200/60 to-white px-6 py-16 text-[13px] text-gray-500 md:gap-20 md:px-16 lg:justify-between lg:px-24 xl:px-32">
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <a href="/">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
          </a>

          <div>
            <p className="font-semibold text-slate-800">Product</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="transition hover:text-green-600">Home</a></li>
              <li><a href="#features" className="transition hover:text-green-600">Features</a></li>
              <li><a href="/app" className="transition hover:text-green-600">Dashboard</a></li>
              <li><a href="/app" className="transition hover:text-green-600">Templates</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-800">Resources</p>
            <ul className="mt-2 space-y-2">
              <li><a href="#features" className="transition hover:text-green-600">Resume features</a></li>
              <li><a href="#testimonial" className="transition hover:text-green-600">Testimonials</a></li>
              <li><a href="#cta" className="transition hover:text-green-600">Get started</a></li>
              <li><a href="/" className="transition hover:text-green-600">About</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-800">Legal</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="transition hover:text-green-600">Privacy</a></li>
              <li><a href="/" className="transition hover:text-green-600">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 max-md:items-center max-md:text-center">
          <p className="max-w-60">
            A professional resume builder for creating ATS-friendly resumes with live preview, secure saving, and
            print-ready export.
          </p>
          <p className="mt-3 text-center">Copyright 2026 Resume Builder</p>
        </div>
      </footer>
    </>
  )
}

export default Footer

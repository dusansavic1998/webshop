'use client';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#e94560]/30">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
              <div>
                <span className="text-2xl font-bold">BePro</span>
                <p className="text-gray-400 text-xs">Betonski proizvodi</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Više od 38 godina iskustva u proizvodnji betonskih proizvoda. 
              Preko 500 različitih proizvoda za uređenje vašeg prostora.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#e94560] rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#e94560] rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#e94560] rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Proizvodi Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#e94560] rounded-full"></span>
              Proizvodi
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Betonske ploče</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Kocke & Pločnici</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Mobilijar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Dekorativni elementi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Nosači za solare</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Sredstva za održavanje</a></li>
            </ul>
          </div>

          {/* Usluge Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#e94560] rounded-full"></span>
              Informacije
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">O nama</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Novosti</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Katalozi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Upute za ugradnju</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all">Česta pitanja</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#e94560] rounded-full"></span>
              Kontakt
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adresa</p>
                  <p className="text-white">BiH, Sarajevo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Telefon</p>
                  <p className="text-white">+387 60 123 456</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">info@bepro-doo.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Radno vrijeme</p>
                  <p className="text-white">Pon-Pet: 08:00 - 17:00</p>
                  <p className="text-gray-400 text-sm">Sub: 08:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold">Pretplatite se na newsletter</h4>
              <p className="text-gray-400 mt-1">Pratite naše akcije i novitete u ponudi</p>
            </div>
            <form className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Vaš email"
                className="flex-1 lg:w-72 px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#e94560]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#e94560] hover:bg-[#d63d56] rounded-full font-semibold transition-colors"
              >
                Pretplati se
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 BePro d.o.o. Sva prava pridržana.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Politika privatnosti</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Uvjeti korištenja</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Kolačići</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

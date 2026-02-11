export default function KontaktPage() {
  return (
    <div className="bg-luxury-cream min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-6xl md:text-7xl font-sans font-black text-luxury-black tracking-tight">
              Kontakt
            </h1>
            <p className="text-xl text-luxury-stone leading-relaxed tracking-wide">
              Wir freuen uns auf Ihre Nachricht
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-white p-12 shadow-elegant">
                <h2 className="text-3xl font-serif text-luxury-black mb-10">
                  Nachricht senden
                </h2>
                <form className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-luxury-stone text-sm uppercase tracking-widest mb-3">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-0 py-4 border-0 border-b border-luxury-stone/30 focus:outline-none focus:border-luxury-gold bg-transparent text-luxury-black transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-luxury-stone text-sm uppercase tracking-widest mb-3">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-0 py-4 border-0 border-b border-luxury-stone/30 focus:outline-none focus:border-luxury-gold bg-transparent text-luxury-black transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-luxury-stone text-sm uppercase tracking-widest mb-3">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-0 py-4 border-0 border-b border-luxury-stone/30 focus:outline-none focus:border-luxury-gold bg-transparent text-luxury-black transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-luxury-stone text-sm uppercase tracking-widest mb-3">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-0 py-4 border-0 border-b border-luxury-stone/30 focus:outline-none focus:border-luxury-gold bg-transparent text-luxury-black resize-none transition-colors duration-300"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-12 py-5 border-2 border-luxury-gold text-luxury-gold text-sm uppercase tracking-widest font-medium hover:bg-luxury-gold hover:text-white transition-all duration-500 mt-4"
                  >
                    Nachricht senden
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white p-12 shadow-elegant">
                  <h3 className="text-2xl font-serif text-luxury-black mb-8">
                    Kontaktinformationen
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-luxury-stone mb-3">E-Mail</h4>
                      <a href="mailto:info@bozic-watches.com" className="text-luxury-black hover:text-luxury-gold transition-colors text-lg">
                        info@bozic-watches.com
                      </a>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-luxury-stone mb-3">Telefon</h4>
                      <a href="tel:+49XXXXXXXXX" className="text-luxury-black hover:text-luxury-gold transition-colors text-lg">
                        +49 XXX XXXXXXX
                      </a>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-luxury-stone mb-3">WhatsApp</h4>
                      <a 
                        href="https://wa.me/49XXXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-luxury-black hover:text-luxury-gold transition-colors text-lg"
                      >
                        Direkt zum Chat
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-12 shadow-elegant">
                  <h3 className="text-2xl font-serif text-luxury-black mb-8">
                    Öffnungszeiten
                  </h3>
                  <div className="space-y-4 text-luxury-stone">
                    <div className="flex justify-between items-center py-3 border-b border-luxury-stone/10">
                      <span className="text-sm uppercase tracking-wider">Montag - Freitag</span>
                      <span className="font-semibold text-luxury-black">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-luxury-stone/10">
                      <span className="text-sm uppercase tracking-wider">Samstag</span>
                      <span className="font-semibold text-luxury-black">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm uppercase tracking-wider">Sonntag</span>
                      <span className="font-semibold text-luxury-black">Geschlossen</span>
                    </div>
                  </div>
                  <p className="text-sm text-luxury-stone mt-6 italic">
                    * Termine nach Vereinbarung auch außerhalb der Öffnungszeiten möglich
                  </p>
                </div>

                <div className="bg-gradient-luxury p-12 shadow-elegant">
                  <h3 className="text-2xl font-serif text-luxury-cream mb-6">
                    Persönliche Beratung
                  </h3>
                  <p className="text-luxury-pearl/80 mb-6 leading-relaxed">
                    Vereinbaren Sie einen persönlichen Termin für eine ausführliche Beratung vor Ort.
                  </p>
                  <p className="text-sm text-luxury-pearl/70">
                    Wir nehmen uns Zeit für Sie und Ihre Fragen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

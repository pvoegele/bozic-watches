export default function KontaktPage() {
  return (
    <div className="bg-luxury-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-luxury-charcoal mb-4">
            Kontakt
          </h1>
          <p className="text-lg text-luxury-stone max-w-2xl mx-auto">
            Wir freuen uns auf Ihre Nachricht
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg border border-luxury-sand">
              <h2 className="text-2xl font-serif text-luxury-charcoal mb-6">
                Nachricht senden
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-luxury-stone mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-luxury-sand rounded focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-luxury-stone mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-luxury-sand rounded focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-luxury-stone mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-luxury-sand rounded focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-luxury-stone mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-luxury-sand rounded focus:outline-none focus:border-luxury-gold"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-luxury-gold text-white px-8 py-4 rounded hover:bg-luxury-forest transition-colors duration-200 font-semibold"
                >
                  Nachricht senden
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg border border-luxury-sand">
                <h3 className="text-xl font-serif text-luxury-charcoal mb-4">
                  Kontaktinformationen
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-luxury-charcoal mb-1">E-Mail</h4>
                    <a href="mailto:info@bozic-watches.com" className="text-luxury-stone hover:text-luxury-gold transition-colors">
                      info@bozic-watches.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-charcoal mb-1">Telefon</h4>
                    <a href="tel:+49XXXXXXXXX" className="text-luxury-stone hover:text-luxury-gold transition-colors">
                      +49 XXX XXXXXXX
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-charcoal mb-1">WhatsApp</h4>
                    <a 
                      href="https://wa.me/49XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-luxury-stone hover:text-luxury-gold transition-colors"
                    >
                      Direkt zum Chat
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg border border-luxury-sand">
                <h3 className="text-xl font-serif text-luxury-charcoal mb-4">
                  Öffnungszeiten
                </h3>
                <div className="space-y-2 text-luxury-stone">
                  <div className="flex justify-between">
                    <span>Montag - Freitag</span>
                    <span className="font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag</span>
                    <span className="font-semibold">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sonntag</span>
                    <span className="font-semibold">Geschlossen</span>
                  </div>
                </div>
                <p className="text-sm text-luxury-stone mt-4">
                  * Termine nach Vereinbarung auch außerhalb der Öffnungszeiten möglich
                </p>
              </div>

              <div className="bg-luxury-gold p-8 rounded-lg text-white">
                <h3 className="text-xl font-serif mb-4">
                  Persönliche Beratung
                </h3>
                <p className="mb-4">
                  Vereinbaren Sie einen persönlichen Termin für eine ausführliche Beratung vor Ort.
                </p>
                <p className="text-sm">
                  Wir nehmen uns Zeit für Sie und Ihre Fragen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

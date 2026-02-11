import Link from 'next/link';

export default function AnkaufPage() {
  return (
    <div className="bg-luxury-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-luxury-charcoal mb-4">
            Uhren Ankauf
          </h1>
          <p className="text-lg text-luxury-stone max-w-2xl mx-auto">
            Verkaufen Sie Ihre Luxusuhr fair, sicher und unkompliziert
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-serif text-luxury-charcoal mb-8 text-center">
            Ankauf in 3 einfachen Schritten
          </h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg border border-luxury-sand">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-luxury-charcoal mb-3">
                    Kontaktaufnahme
                  </h3>
                  <p className="text-luxury-stone mb-4">
                    Nehmen Sie ganz einfach mit uns Kontakt auf - per E-Mail, Telefon oder WhatsApp. 
                    Senden Sie uns Fotos und Informationen zu Ihrer Uhr.
                  </p>
                  <ul className="list-disc list-inside text-luxury-stone space-y-2">
                    <li>E-Mail: info@bozic-watches.com</li>
                    <li>Telefon: +49 XXX XXXXXXX</li>
                    <li>WhatsApp: Sofortige Antwort</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg border border-luxury-sand">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-luxury-charcoal mb-3">
                    Bewertung & Angebot
                  </h3>
                  <p className="text-luxury-stone mb-4">
                    Unsere Experten bewerten Ihre Uhr professionell und fair. 
                    Sie erhalten ein transparentes und marktgerechtes Angebot.
                  </p>
                  <ul className="list-disc list-inside text-luxury-stone space-y-2">
                    <li>Kostenlose Bewertung</li>
                    <li>Faire Marktpreise</li>
                    <li>Transparente Kriterien</li>
                    <li>Unverbindliches Angebot</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg border border-luxury-sand">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-luxury-charcoal mb-3">
                    Abwicklung & Zahlung
                  </h3>
                  <p className="text-luxury-stone mb-4">
                    Schnelle und sichere Abwicklung. Sie erhalten Ihr Geld umgehend nach Übergabe der Uhr.
                  </p>
                  <ul className="list-disc list-inside text-luxury-stone space-y-2">
                    <li>Persönliche Übergabe möglich</li>
                    <li>Versicherter Versand optional</li>
                    <li>Sofortige Bezahlung</li>
                    <li>Banküberweisung oder Bar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brands We Buy */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-serif text-luxury-charcoal mb-8 text-center">
            Diese Marken kaufen wir an
          </h2>
          <div className="bg-white p-8 rounded-lg border border-luxury-sand">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              <div className="text-luxury-stone font-semibold">Rolex</div>
              <div className="text-luxury-stone font-semibold">Patek Philippe</div>
              <div className="text-luxury-stone font-semibold">Audemars Piguet</div>
              <div className="text-luxury-stone font-semibold">Omega</div>
              <div className="text-luxury-stone font-semibold">IWC</div>
              <div className="text-luxury-stone font-semibold">Cartier</div>
              <div className="text-luxury-stone font-semibold">Breitling</div>
              <div className="text-luxury-stone font-semibold">TAG Heuer</div>
            </div>
            <p className="text-luxury-stone text-center mt-6">
              ... und viele weitere Luxusuhrenmarken
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center bg-luxury-sand p-12 rounded-lg">
          <h2 className="text-3xl font-serif text-luxury-charcoal mb-6">
            Bereit, Ihre Uhr zu verkaufen?
          </h2>
          <p className="text-luxury-stone mb-8">
            Kontaktieren Sie uns jetzt für eine kostenlose und unverbindliche Bewertung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/kontakt"
              className="bg-luxury-gold text-white px-8 py-4 rounded hover:bg-luxury-forest transition-colors duration-200 font-semibold"
            >
              Kontakt aufnehmen
            </Link>
            <a 
              href="https://wa.me/49XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded hover:bg-green-700 transition-colors duration-200 font-semibold"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

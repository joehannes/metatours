import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContactForm from '../components/ContactForm';
import { useBrand } from '../contexts/BrandContext';
import { useI18n } from '../contexts/I18nContext';
import { useSitePages } from '../edt/sitePages';
import PageHeader from '../components/layout/PageHeader';
import { Toucan, Hibiscus } from '../components/ui/Illustrations';
import QuickPay from '../components/payment/QuickPay';

const OFFICE = { lat: 18.683542, lng: -68.416016 };

const Contact = () => {
  const { brandSettings } = useBrand();
  const { locale } = useI18n();
  const pages = useSitePages(locale);
  const address = pages?.contact.address || 'Punta Cana, Dominican Republic';

  return (
    <div className="pb-20">
      <PageHeader
        tone="mango"
        image="/imgs/edt/gallery/beach-walk.webp"
        kicker="Hola"
        title={<FormattedMessage id="contact.title" />}
        subtitle={<FormattedMessage id="contact.description" />}
        artLeft={<Toucan className="h-28 w-32 animate-bob" />}
        artRight={<Hibiscus className="h-24 w-24 animate-sway" />}
      />

      <div className="section-shell -mt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ContactForm />
          <div className="glass-card rounded-[28px] p-8">
            <h2 className="mb-5 font-display text-3xl font-extrabold text-ink"><FormattedMessage id="contact.getInTouch" /></h2>
            <p className="mb-2 text-ink-soft"><FormattedMessage id="contact.addressLabel" />: {address}</p>
            <p className="mb-6 text-ink-soft"><FormattedMessage id="contact.phoneLabel" />: {brandSettings.phoneNumber}</p>
            <iframe
              src={`https://www.google.com/maps?q=${OFFICE.lat},${OFFICE.lng}&z=18&output=embed`}
              width="100%"
              height="280"
              className="mt-6 rounded-[18px] border-[2.5px] border-ink"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tour Cana RD VIP location"
            ></iframe>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${OFFICE.lat},${OFFICE.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-ink-soft underline underline-offset-4"
            >
              Google Maps ↗
            </a>
          </div>
        </div>

        {/* Any amount, by card or PayPal — the deposit buttons that used to
            sit beside the map, grown into a widget that also takes links
            from the WhatsApp return prompt (/contact?pay=…&ref=…#pay). */}
        <div className="mt-10">
          <QuickPay />
        </div>
      </div>
    </div>
  );
};

export default Contact;

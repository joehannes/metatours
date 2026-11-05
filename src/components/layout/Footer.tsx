import React, { useState, useEffect } from 'react';
import { localeText } from '../../lib/localeText';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useBrand } from '../../contexts/BrandContext';
import { useI18n } from '../../contexts/I18nContext';
import { getSocialMediaData, SocialMediaAccount } from '../../services/socialMediaService';
import { WaveBand } from '../ui/Illustrations';

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  youtube: <FaYoutube className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />
};

/**
 * The page ends underwater. A current line hands it over to deep water, a
 * humpback from Samaná passes slowly behind the links, and the reef grows
 * along the floor.
 */
const Footer = () => {
  const { brandSettings } = useBrand();
  const { locale } = useI18n();
  const [socialAccounts, setSocialAccounts] = useState<SocialMediaAccount[]>([]);

  useEffect(() => {
    const loadSocialAccounts = async () => {
      const data = await getSocialMediaData();
      setSocialAccounts(data.accounts.filter((a: SocialMediaAccount) => a.enabled));
    };
    loadSocialAccounts();
  }, []);

  const linkClass = 'font-semibold text-paper/90 no-underline transition-colors hover:text-lagoon-light';

  return (
    <footer className="relative mt-auto">
      <WaveBand tone="abyss" className="block h-14 w-full sm:h-20" />

      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#1A202C_0%,#2D3748_100%)] pb-20 pt-12 text-paper sm:pb-28">
        {/* Subtle gradient glow at top. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,178,172,0.12),transparent_70%)]" />

        <div className="section-shell relative z-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-white/10">
                  {brandSettings.brandicon ? (
                    <img src={brandSettings.brandicon} alt="Logo" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <img src="/competitor-logo.svg" alt="Logo" className="h-8 w-8" loading="lazy" decoding="async" />
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-paper">{brandSettings.brandName}</h3>
              </div>
              <p className="max-w-md font-medium leading-relaxed text-paper/80">
                <FormattedMessage id="footer.description" />
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-lagoon-light">
                Tour Cana RD VIP
              </p>

              {socialAccounts.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {socialAccounts.map((account) => (
                    <a
                      key={account.platform}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-lagoon hover:text-white"
                      title={`Follow on ${account.platform}`}
                    >
                      {platformIcons[account.platform]}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 className="mb-4 font-display text-lg font-bold text-mango-light">
                <FormattedMessage id="footer.quickLinks" />
              </h4>
              <ul className="space-y-2.5">
                <li><Link to="/#top" className={linkClass}><FormattedMessage id="footer.home" /></Link></li>
                <li><Link to="/tours#top" className={linkClass}><FormattedMessage id="footer.tours" /></Link></li>
                <li><Link to="/transport#top" className={linkClass}><FormattedMessage id="footer.transport" defaultMessage="Transport" /></Link></li>
                <li><Link to="/contact#top" className={linkClass}><FormattedMessage id="footer.contact" /></Link></li>
                <li>
                  <Link to="/admin" className={`inline-flex items-center gap-1 ${linkClass}`}>
                    <MdAdminPanelSettings />
                    <FormattedMessage id="footer.admin" />
                  </Link>
                </li>
              </ul>
            </div>

            {socialAccounts.length > 0 && (
              <div>
                <h4 className="mb-4 font-display text-lg font-bold text-mango-light">Follow Us</h4>
                <div className="space-y-2 text-sm">
                  {socialAccounts.map((account) => (
                    <div key={account.platform} className="flex items-center gap-2">
                      <span className="text-lagoon-light">{platformIcons[account.platform]}</span>
                      <a href={account.url} target="_blank" rel="noopener noreferrer" className={`capitalize ${linkClass}`}>
                        {account.platform} @{account.username}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 border-t border-dashed border-paper/20 pt-6 text-sm font-medium text-paper/65">
            <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button — fixed bottom-right, 64px touch target, jungle color. */}
      <a
        href={`https://wa.me/${brandSettings.whatsappNumber || '18095551234'}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-jungle text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jungle sm:h-[4.5rem] sm:w-[4.5rem]"
      >
        <FaWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" />
      </a>
    </footer>
  );
};

export default Footer;

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MdHome, MdTour, MdLocalTaxi, MdEmail, MdLibraryBooks, MdShoppingCart } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import AdminNav from './AdminNav';
import CartBadge from '../cart/CartBadge';
import { onNavLinkClick } from '../../lib/navScroll';
import { showsBrandName } from '../../lib/brandDisplay';
import AdminLanguageSelect from '../admin/AdminLanguageSelect';
import LanguageSwitcher from '../LanguageSwitcher';
import { useBrand } from '../../contexts/BrandContext';
import { useI18n } from '../../contexts/I18nContext';
import { playClickFx, playHoverFx } from '../../lib/soundEngine';
import { getAdminPassword, clearAdminPassword } from '../../services/authStore';

/**
 * No menu bar. This is a beach.
 *
 * On a wide screen a liana is strung across the top of the page and the
 * links hang from it as luggage tags — each on its own length of string,
 * swinging when you brush past it. The logo hangs from it too, like a
 * coconut.
 *
 * On a phone, and on a wide screen once the vine has scrolled away, there is
 * a life ring in the corner. Throw it and a beach signpost rises out of the
 * sand, with a wooden arrow for every place you can go.
 */

interface NavItem {
  to: string;
  id: string;
  fallback: string;
  icon: React.ReactNode;
  note: Record<'en' | 'es' | 'fr' | 'de', string>;
  accent?: 'mango';
  match: (path: string) => boolean;
}

const NAV: NavItem[] = [
  { to: '/', id: 'nav.home', fallback: 'Home', icon: <MdHome />, note: { en: 'the beach', es: 'la playa', fr: 'la plage', de: 'der Strand' }, match: (p) => p === '/' },
  {
    to: '/plan',
    id: 'nav.plan',
    fallback: 'Plan',
    icon: <HiSparkles />,
    note: { en: 'my day', es: 'mi día', fr: 'ma journée', de: 'mein Tag' },
    accent: 'mango',
    match: (p) => p.startsWith('/plan'),
  },
  { to: '/tours', id: 'nav.tours', fallback: 'Tours', icon: <MdTour />, note: { en: 'excursions', es: 'excursiones', fr: 'excursions', de: 'Ausflüge' }, match: (p) => p.startsWith('/tours') || p.startsWith('/details/tours') },
  { to: '/transport', id: 'nav.transport', fallback: 'Transport', icon: <MdLocalTaxi />, note: { en: 'rides', es: 'traslados', fr: 'trajets', de: 'Fahrten' }, match: (p) => p.startsWith('/transport') },
  { to: '/blog', id: 'nav.blog', fallback: 'Blog', icon: <MdLibraryBooks />, note: { en: 'stories', es: 'historias', fr: 'histoires', de: 'Geschichten' }, match: (p) => p.startsWith('/blog') },
  { to: '/contact', id: 'nav.contact', fallback: 'Contact', icon: <MdEmail />, note: { en: 'say hola', es: 'di hola', fr: 'dites hola', de: 'sag hallo' }, match: (p) => p.startsWith('/contact') },
];

/** The cart hangs at the end of the vine, a little shorter than the rest. */
const CART: NavItem = {
  to: '/cart',
  id: 'nav.cart',
  fallback: 'Cart',
  icon: <MdShoppingCart />,
  note: { en: 'my trip', es: 'mi viaje', fr: 'mon voyage', de: 'meine Reise' },
  match: (p) => p.startsWith('/cart'),
};

const STRINGS = [22, 40, 28, 46, 30, 38];

/**
 * The header floats 0.75rem below the top of the window, so a rope that only
 * started at the header looked tied to thin air. Every rope is ROPE_EXTRA
 * longer and every hanging piece is lifted by ROPE_LIFT: the ropes now run up
 * past the edge of the window, and what hangs from them sits the difference
 * (1.5rem) lower than before.
 */
const ROPE_EXTRA = '3rem';
const ROPE_LIFT = '-1.5rem';

/* ── Pieces ────────────────────────────────────────────────────────────── */

/** Clean horizontal rule instead of organic vine. */
const Vine: React.FC = () => (
  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-light/20 to-transparent" aria-hidden="true" />
);

/** Clean hamburger button. Transforms to X when menu is open. */
const LifeRing: React.FC<{ open: boolean; onClick: () => void; label: string }> = ({ open, onClick, label }) => (
  <motion.button
    type="button"
    onClick={onClick}
    onMouseEnter={() => playHoverFx()}
    aria-label={label}
    aria-expanded={open}
    className="relative grid h-12 w-12 place-items-center rounded-xl bg-white shadow-ink-sm border border-ink-light/10"
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  >
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink">
      {open ? (
        <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7 H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          <path d="M4 12 H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          <path d="M4 17 H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </>
      )}
    </svg>
  </motion.button>
);

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { brandSettings } = useBrand();
  return (
    <div className={`brand-logo relative rounded-full ${className}`}>
      <div className="brand-logo-image h-full w-full overflow-hidden rounded-full">
        {brandSettings.brandicon ? (
          <img src={brandSettings.brandicon} alt="Logo" className="h-full w-full object-cover" />
        ) : (
          <img src="/competitor-logo.svg" alt="Logo" className="h-full w-full p-2" />
        )}
      </div>
    </div>
  );
};

/** The beach signpost that rises when the life ring is thrown. */
const Signpost: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const location = useLocation();
  const { locale } = useI18n();
  const reduced = useReducedMotion();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Clean white overlay — no painted landscape. */}
      <div
        className="absolute inset-0 bg-white/98"
        onClick={onClose}
      />
      <div className="pointer-events-none absolute right-[12%] top-[8%] h-24 w-24 rounded-full bg-[radial-gradient(circle,#fff4c9_0%,#ffd47e_45%,transparent_70%)]" />
      {/* Compass: left-aligned on mobile */}
      <div className="relative z-20 flex justify-start pl-5 pt-3">
        <LanguageSwitcher />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-md flex-col items-center px-6 pb-6 pt-0">
        {/* Clean centered list — no wooden post or arrow shapes. */}
        <div className="relative z-10 flex w-full max-w-sm flex-col gap-2 mx-auto pt-8">
          {[...NAV, CART].map((item, i) => {
            const active = item.match(location.pathname);
            return (
              <motion.div
                key={item.to}
                className="flex justify-center"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
              >
                <Link
                  to={item.to}
                  onClick={(event) => {
                    playClickFx();
                    onNavLinkClick(event, item.to, location.pathname);
                    onClose();
                  }}
                  aria-current={active ? 'page' : undefined}
                  className="group flex w-full items-center gap-4 rounded-xl px-5 py-4 text-ink no-underline transition-colors hover:bg-lagoon-light/30"
                  style={{
                    background: active ? 'var(--lagoon-light)' : 'transparent',
                  }}
                >
                  <span className="text-2xl text-lagoon-dark">{item.icon}</span>
                  <span className="flex flex-col leading-none">
                    <span className="font-display text-lg font-bold">
                      <FormattedMessage id={item.id} defaultMessage={item.fallback} />
                      {item === CART && <CartBadge className="ml-2 align-middle" />}
                    </span>
                    <span className="text-sm font-medium text-ink-soft">{item.note[locale]}</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
};

/* ── Header ────────────────────────────────────────────────────────────── */

const Header: React.FC = () => {
  const { brandSettings } = useBrand();
  const { locale } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAdminPassword());
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleAuthChange = () => setIsAuthenticated(!!getAdminPassword());
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin') && isAuthenticated;

  // The back office keeps a plain working bar: it is a tool, not a beach.
  // One line: the menu, the language and log-out. The logo is pinned to the
  // corner, out of the flow, so its sway and aura never push anything around.
  if (isAdminRoute) {
    return (
      <>
        <Link
          to="/"
          aria-label={brandSettings.brandName}
          title={brandSettings.brandName}
          className="fixed left-2 top-1.5 z-[60] no-underline"
        >
          <Logo className="h-9 w-9 ring-2" />
        </Link>
        <header className="lobster-header sticky top-0 z-50">
          <nav className="flex items-center gap-2 py-1.5 pl-14 pr-2">
            <AdminNav
              onNavigate={() => playClickFx()}
              onLogout={() => {
                clearAdminPassword();
                navigate('/');
              }}
              trailing={<AdminLanguageSelect />}
            />
          </nav>
        </header>
      </>
    );
  }

  const ringLabel = locale === 'es' ? 'Abrir el letrero de la playa' : locale === 'fr' ? 'Ouvrir le panneau de plage' : locale === 'de' ? 'Strandwegweiser öffnen' : 'Open the beach signpost';

  return (
    <>
      <header className="fixed inset-x-4 top-3 z-50 h-[5rem] lg:h-[9rem]">
        {/* Phones: a pebble with the logo and the name. */}
        <Link
          to="/"
          onClick={(event) => {
            playClickFx();
            onNavLinkClick(event, '/', location.pathname);
          }}
          className="absolute left-4 top-3 flex items-center gap-2.5 no-underline lg:hidden"
        >
          <Logo className="h-14 w-14" />
          {showsBrandName(brandSettings) ? (
            <span className="brand-name-crystal max-w-[11rem] text-lg leading-tight">{brandSettings.brandName}</span>
          ) : (
            <span className="sr-only">{brandSettings.brandName}</span>
          )}
        </Link>

        {/* Wide screens: the vine. */}
        <div className="absolute inset-x-0 top-0 hidden lg:block" style={{ height: '9rem', overflow: 'visible' }}>
          <Vine />
          <div className="section-shell relative flex h-full items-start justify-between">
            <Link
              to="/"
              onClick={(event) => {
                playClickFx();
                onNavLinkClick(event, '/', location.pathname);
              }}
              onMouseEnter={() => playHoverFx()}
              className="group relative mt-0 flex items-start gap-4 no-underline"
            >
              <motion.div
                className="flex flex-col items-center"
                style={{ transformOrigin: '50% 0%', marginTop: ROPE_LIFT }}
                initial={reduced ? false : { y: -120 }}
                animate={{ y: 0 }}
                whileHover={{ rotate: [0, -6, 4, -2, 0], transition: { duration: 1.4 } }}
                transition={{ type: 'spring', stiffness: 90, damping: 11 }}
              >
                {/* Logo rope — anchored to y=0 of the vine container */}
                <span className="rope-string" style={{ height: `calc(1.4rem + ${ROPE_EXTRA})` }} />
                <Logo className="h-24 w-24" />
              </motion.div>
              {showsBrandName(brandSettings) ? (
                <span className="desktop-brand-name brand-name-crystal mt-[4rem]">
                  {brandSettings.brandName}
                </span>
              ) : (
                <span className="sr-only">{brandSettings.brandName}</span>
              )}
            </Link>

            <nav className="flex items-start gap-2 xl:gap-4" aria-label="Main">
              {NAV.map((item, i) => {
                const active = item.match(location.pathname);
                return (
                  <motion.div
                    key={item.to}
                    className="flex flex-col items-center"
                    style={{ transformOrigin: '50% 0%', marginTop: ROPE_LIFT }}
                    initial={reduced ? false : { y: -140 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 110, damping: 10, delay: 0.1 + i * 0.07 }}
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      style={{ transformOrigin: '50% 0%' }}
                      whileHover={reduced ? undefined : { rotate: [0, 9, -7, 4, -2, 0], transition: { duration: 1.6 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Rope runs from top-0 of the header wrapper */}
                      <span className="rope-string" style={{ height: `calc(${STRINGS[i % STRINGS.length]}px + ${ROPE_EXTRA})` }} />
                      <Link
                        to={item.to}
                        onClick={(event) => {
                          playClickFx();
                          onNavLinkClick(event, item.to, location.pathname);
                        }}
                        onMouseEnter={() => playHoverFx()}
                        aria-current={active ? 'page' : undefined}
                        data-active={active}
                        data-accent={item.accent}
                        className={`vine-tag vine-tag-item-${i % 6}`}
                      >
                        <span className="vine-tag-icon">{item.icon}</span>
                        <FormattedMessage id={item.id} defaultMessage={item.fallback} />
                        <span className="vine-tag-note">{item.note[locale]}</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
              <motion.div
                className="flex flex-col items-center"
                style={{ transformOrigin: '50% 0%', marginTop: ROPE_LIFT }}
                initial={reduced ? false : { y: -140 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 110, damping: 10, delay: 0.1 + NAV.length * 0.07 }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  style={{ transformOrigin: '50% 0%' }}
                  whileHover={reduced ? undefined : { rotate: [0, 9, -7, 4, -2, 0], transition: { duration: 1.6 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="rope-string" style={{ height: `calc(18px + ${ROPE_EXTRA})` }} />
                  <Link
                    to={CART.to}
                    onClick={(event) => {
                      playClickFx();
                      onNavLinkClick(event, CART.to, location.pathname);
                    }}
                    onMouseEnter={() => playHoverFx()}
                    aria-current={CART.match(location.pathname) ? 'page' : undefined}
                    data-active={CART.match(location.pathname)}
                    className="vine-tag vine-tag-item-1 relative"
                  >
                    <span className="vine-tag-icon">{CART.icon}</span>
                    <FormattedMessage id={CART.id} defaultMessage={CART.fallback} />
                    <span className="vine-tag-note">{CART.note[locale]}</span>
                    <CartBadge className="absolute -right-2 -top-2" />
                  </Link>
                </motion.div>
              </motion.div>
              <div className="ml-2 mt-4 flex items-center gap-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* The full-page signpost remains a mobile-only menu. */}
      <div className="fixed right-3 top-3 z-[70] lg:hidden">
        <LifeRing open={menuOpen} label={ringLabel} onClick={() => { playClickFx(); setMenuOpen((v) => !v); }} />
        {!menuOpen && (
          <Link to="/cart" aria-label="Cart" className="absolute -left-1 top-0 no-underline" onClick={() => playClickFx()}>
            <CartBadge />
          </Link>
        )}
      </div>

      <AnimatePresence>{menuOpen && <Signpost onClose={closeMenu} />}</AnimatePresence>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTripadvisor, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useBrand } from '../../contexts/BrandContext';
import { brandNameStyle } from '../../lib/brandDisplay';
import { SITE_DEFAULTS } from '../../config/siteDefaults';
import { getSocialMediaData, SocialMediaAccount } from '../../services/socialMediaService';

/**
 * Returns true when the logo URL is a video format that must be rendered as
 * a <video> element (mp4 or webm); animated webp plays fine in an <img>.
 */
const isVideoUrl = (url: string) => /\.(mp4|webm)(\?|$)/i.test(url);

/**
 * The logo, with the name beside it as the admin set it (Marca → "Nombre junto
 * al logo"): in capitals, exactly as entered, or hidden — the logo alone.
 * Without a logo uploaded, the name is the logo.
 *
 * Animated logos (webm, mp4, animated webp) are rendered as-is; CSS handles
 * their size and border-radius (`logoCorners`).  Static PNGs already have
 * their corners baked in by the canvas editor.
 */
export const BrandLogo: React.FC<{ tone?: 'colour' | 'white'; className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  tone = 'colour',
  className = '',
  size = 'md',
}) => {
  const { brandSettings } = useBrand();
  const icon = brandSettings.brandicon;
  const name = brandSettings.brandName.trim();
  const style = brandNameStyle(brandSettings);
  const withName = Boolean(name) && (style !== 'hidden' || !icon);
  const height = size === 'lg' ? 'h-14' : size === 'sm' ? 'h-9' : 'h-11';
  const scale = brandSettings.navbarLogoScale ?? 1;
  const isAnimated = brandSettings.brandIconType === 'animated';

  // border-radius: for animated logos use the logoCorners setting (default 50%
  // = pill/circle, matching the former rounded-full default). For static PNGs
  // the corners are already in the image pixels, so no extra radius needed.
  const cornersPct = isAnimated
    ? (brandSettings.logoCorners ?? 50)
    : undefined;
  const iconStyle = cornersPct !== undefined ? { borderRadius: `${cornersPct}%` } : undefined;

  const iconClass = `${height} aspect-square w-auto select-none object-contain`;

  return (
    <span
      className={`inline-flex items-center gap-2.5 origin-left ${className}`}
      style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
    >
      {icon && (
        isVideoUrl(icon) ? (
          <video
            src={icon}
            autoPlay
            loop
            muted
            playsInline
            aria-label={withName ? '' : name}
            className={iconClass}
            style={iconStyle}
          />
        ) : (
          <img
            src={icon}
            alt={withName ? '' : name}
            className={isAnimated ? iconClass : `${iconClass} rounded-full bg-white p-0.5 ring-1 ring-lagoon/20 shadow-sm`}
            style={iconStyle}
            draggable={false}
          />
        )
      )}
      {withName && (
        <span
          className={`max-w-[12rem] font-display text-lg leading-none ${tone === 'white' ? 'text-white' : 'text-ink'}`}
          // .font-display sets capitals for every headline; "as entered" overrides it here.
          style={{ textTransform: style === 'asis' ? 'none' : 'uppercase' }}
        >
          {name}
        </span>
      )}
    </span>
  );
};

export const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  tripadvisor: FaTripadvisor,
  youtube: FaYoutube,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

export const SOCIAL_NAMES: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  tripadvisor: 'Tripadvisor',
  youtube: 'YouTube',
  twitter: 'X',
  linkedin: 'LinkedIn',
};

let socialCache: Promise<SocialMediaAccount[]> | null = null;

/** The social accounts switched on in the admin. */
export const useSocialAccounts = (): SocialMediaAccount[] => {
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([]);
  useEffect(() => {
    let live = true;
    socialCache ??= getSocialMediaData().then((data) => data.accounts.filter((account) => account.enabled && account.url));
    socialCache.then((list) => live && setAccounts(list));
    return () => {
      live = false;
    };
  }, []);
  return accounts;
};

export const SocialIcons: React.FC<{ className?: string; itemClassName?: string }> = ({ className = '', itemClassName = '' }) => {
  const accounts = useSocialAccounts();
  if (!accounts.length) return null;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {accounts.map((account) => {
        const Icon = SOCIAL_ICONS[account.platform] ?? FaInstagram;
        return (
          <a
            key={account.platform + account.url}
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_NAMES[account.platform] ?? account.platform}
            title={SOCIAL_NAMES[account.platform] ?? account.platform}
            className={itemClassName}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
};

/** Where the company is, used until site-pages has loaded. */
export const CONTACT = {
  address: 'Punta Cana, Dominican Republic',
};

/** The footer's partner sites: configured explicitly in Admin › Marca; empty means none. */
export const usePartners = () => {
  const { brandSettings } = useBrand();
  const fallback = SITE_DEFAULTS.partners;
  return {
    hotels: brandSettings.partnerHotelsUrl ?? fallback?.hotels ?? '',
    flights: brandSettings.partnerFlightsUrl ?? fallback?.flights ?? '',
    cruises: brandSettings.partnerCruisesUrl ?? fallback?.cruises ?? '',
  };
};

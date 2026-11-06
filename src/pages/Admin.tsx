import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getBrandSettings, saveBrandSettings, BrandSettings, uploadBrandIcon } from '../services/brandService';
import { brandNameStyle } from '../lib/brandDisplay';
import BrandIconEditor from '../components/admin/BrandIconEditor';
import { SITE_DEFAULTS } from '../config/siteDefaults';
import { getTours, saveTours, Tour } from '../services/toursService';
import { useI18n } from '../contexts/I18nContext';
import ServiceAdminPanel from '../components/admin/ServiceAdminPanel';
import TikTokAdmin from '../components/admin/TikTokAdmin';
import SocialMediaAdmin from '../components/admin/SocialMediaAdmin';
import StoryAdmin from '../components/admin/StoryAdmin';
import AIAssistantAdmin from '../components/admin/AIAssistantAdmin';
import AIBlogGenAdmin from '../components/admin/AIBlogGenAdmin';
import TestimonialsAdmin from '../components/admin/TestimonialsAdmin';
import AdminPasswordPanel from '../components/admin/AdminPasswordPanel';
import PaymentSettingsPanel from '../components/admin/PaymentSettingsPanel';
import ContactRequestsPanel from '../components/admin/ContactRequestsPanel';
import NotifySettingsPanel from '../components/admin/NotifySettingsPanel';
import SalesActivityPanel from '../components/admin/SalesActivityPanel';
import SiteTextsAdmin from '../components/admin/SiteTextsAdmin';
import { FaVideo, FaShareAlt, FaBook, FaRobot, FaMagic } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const Admin: React.FC = () => {
  const { locale } = useI18n();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandName: 'Tours',
    contactName: '',
    phoneNumber: '+1 (809) 555-0123',
    paypalMeLink: 'https://www.paypal.com/paypalme/tours',
    verifoneLink: '',
    brandicon: '',
  });
  const [editingBrand, setEditingBrand] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  /** File picked but not yet framed — drives the crop editor (static images only). */
  const [pendingIconFile, setPendingIconFile] = useState<File | null>(null);
  /**
   * Whether the CSS-only styler overlay is open.
   * Used for animated logos (webm, mp4, animated webp) that cannot be edited
   * on a canvas and so bypass BrandIconEditor.
   */
  const [stylingAnimatedLogo, setStylingAnimatedLogo] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('section') || 'brand';

  useEffect(() => {
    const fetchBrand = async () => {
      const fetchedBrand = await getBrandSettings();
      setBrandSettings(fetchedBrand);
    };
    fetchBrand();
  }, []);

  /**
   * Returns true for animated formats that cannot be drawn on a canvas:
   * mp4, webm, and webp (always treated as potentially animated).
   */
  const isAnimatedFormat = (file: File) =>
    /^(video\/|image\/webp$)/.test(file.type) ||
    /\.(mp4|webm|webp)$/i.test(file.name);

  /** After BrandIconEditor hands back a finished static PNG. */
  const handleBrandIconUpload = async (file: File) => {
    setUploadingIcon(true);
    try {
      const iconUrl = await uploadBrandIcon(file);
      if (iconUrl) {
        const next = { ...brandSettings, brandicon: iconUrl, brandIconType: 'static' as const };
        setBrandSettings(next);
        await saveBrandSettings(next);
      }
      setPendingIconFile(null);
    } catch (error) {
      console.error('No se pudo subir el logo:', error);
    } finally {
      setUploadingIcon(false);
    }
  };

  /**
   * Upload an animated logo (webm / mp4 / animated webp) directly — no editor.
   * Saves brandIconType:'animated' so the renderer knows to skip canvas logic.
   */
  const handleAnimatedLogoUpload = async (file: File) => {
    setUploadingIcon(true);
    try {
      const iconUrl = await uploadBrandIcon(file);
      if (iconUrl) {
        const next = {
          ...brandSettings,
          brandicon: iconUrl,
          brandIconType: 'animated' as const,
          // Keep existing logoCorners if set; otherwise default to 50 (pill/circle)
          logoCorners: brandSettings.logoCorners ?? 50,
        };
        setBrandSettings(next);
        await saveBrandSettings(next);
        // Open the CSS styler so the user can tweak corners right away
        setStylingAnimatedLogo(true);
      }
    } catch (error) {
      console.error('No se pudo subir el logo animado:', error);
    } finally {
      setUploadingIcon(false);
    }
  };

  const triggerBrandIconUpload = () => fileInputRef.current?.click();

  /** Open the current logo in the editor — or the CSS styler if it is animated. */
  const [loadingCurrentIcon, setLoadingCurrentIcon] = useState(false);
  const editCurrentBrandIcon = async () => {
    if (!brandSettings.brandicon) return;
    // Animated logos cannot go through the canvas editor.
    if (brandSettings.brandIconType === 'animated') {
      setStylingAnimatedLogo(true);
      return;
    }
    setLoadingCurrentIcon(true);
    try {
      const response = await fetch(brandSettings.brandicon, { mode: 'cors' });
      const blob = await response.blob();
      setPendingIconFile(new File([blob], 'logo.png', { type: blob.type || 'image/png' }));
    } catch (error) {
      console.error('No se pudo abrir el logo actual:', error);
    } finally {
      setLoadingCurrentIcon(false);
    }
  };

  const loadTours = useCallback(async () => {
    const fetchedTours = await getTours(locale);
    setTours(fetchedTours);
  }, [locale]);

  return (
    <div className="min-h-screen bg-paper-warm py-6">
      <div className="container mx-auto space-y-8 px-4">
        {/* What guests asked for outside WhatsApp, on the page the operator opens first. */}
        {activeSection === 'brand' && <ContactRequestsPanel />}
        {activeSection === 'sales' && (
          <>
            <SalesActivityPanel />
            <ContactRequestsPanel />
            <NotifySettingsPanel />
          </>
        )}

        {/* Brand Settings Section */}
        {activeSection === 'brand' && (
          <div className="rounded-3xl bg-paper-card p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-ink">Datos del negocio</h2>
            {editingBrand ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-ink-soft mb-2">Logo del negocio</label>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg bg-paper-warm p-1.5 ring-1 ring-slate-200">
                      {brandSettings.brandicon ? (
                        /\.(mp4|webm)(\?|$)/i.test(brandSettings.brandicon) ? (
                          <video
                            src={brandSettings.brandicon}
                            autoPlay loop muted playsInline
                            className="max-h-full max-w-full object-contain"
                            style={{ borderRadius: `${brandSettings.logoCorners ?? 50}%` }}
                          />
                        ) : (
                          <img
                            src={brandSettings.brandicon}
                            alt="Vista previa del logo"
                            className="max-h-full max-w-full object-contain"
                            style={brandSettings.brandIconType === 'animated' ? { borderRadius: `${brandSettings.logoCorners ?? 50}%` } : undefined}
                          />
                        )
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-ink-light text-xs uppercase tracking-[.2em]">
                          Sin logo
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={triggerBrandIconUpload}
                        disabled={uploadingIcon}
                        className="inline-flex items-center justify-center rounded-full bg-lagoon-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f4f59] disabled:bg-lagoon"
                      >
                        {uploadingIcon ? 'Subiendo…' : 'Subir logo'}
                      </button>
                      {brandSettings.brandicon && (
                        <button
                          type="button"
                          onClick={editCurrentBrandIcon}
                          disabled={uploadingIcon || loadingCurrentIcon}
                          className="ml-2 inline-flex items-center justify-center rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper disabled:opacity-50"
                        >
                          {loadingCurrentIcon ? 'Abriendo…' : brandSettings.brandIconType === 'animated' ? 'Ajustar forma' : 'Editar el logo actual'}
                        </button>
                      )}
                      <p className="text-xs text-ink-light">
                        Las imágenes estáticas (PNG, JPG…) pasan por el estudio: recorte, forma, redondeo de esquinas, eliminación de fondo y mejora con IA.
                        Los animados (WebM, MP4, WebP animado, GIF) se suben tal cual y solo se ajustan con CSS (redondeo de esquinas).
                      </p>
                    </div>
                  </div>
                  <input
                    ref={(ref) => {
                      fileInputRef.current = ref;
                    }}
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        if (isAnimatedFormat(file)) {
                          // Animated formats bypass the canvas editor — upload directly.
                          void handleAnimatedLogoUpload(file);
                        } else {
                          // Static images go through the crop / edit studio.
                          setPendingIconFile(file);
                        }
                      }
                      // Reset, so picking the same file twice still fires.
                      event.target.value = '';
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={brandSettings.brandName}
                  onChange={(event) => setBrandSettings({ ...brandSettings, brandName: event.target.value })}
                  placeholder="Nombre del negocio"
                  className="rounded-2xl border border-ink/15 px-4 py-3"
                />
                <label className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/15 px-4 py-3 text-sm font-semibold text-ink-soft md:col-span-2">
                  <span>Nombre junto al logo (barra de navegación y pie de página)</span>
                  <select
                    value={brandNameStyle(brandSettings)}
                    onChange={(event) => {
                      const value = event.target.value;
                      setBrandSettings({
                        ...brandSettings,
                        showBrandName: value !== 'hidden',
                        ...(value === 'hidden' ? {} : { brandNameCase: value as 'upper' | 'asis' }),
                      });
                    }}
                    className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
                  >
                    <option value="upper">En mayúsculas</option>
                    <option value="asis">Tal como está escrito</option>
                    <option value="hidden">Oculto (solo el logo)</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-semibold text-ink-soft md:col-span-2">
                  Tamaño del logo en la barra de navegación: {Math.round((brandSettings.navbarLogoScale ?? 1) * 100)} %
                  <input
                    type="range"
                    min={0.75}
                    max={2}
                    step={0.05}
                    value={brandSettings.navbarLogoScale ?? 1}
                    onChange={(event) => setBrandSettings({ ...brandSettings, navbarLogoScale: Number(event.target.value) })}
                    className="w-full accent-[var(--mango-dark,#bd6f16)]"
                  />
                  <span className="text-xs font-normal">
                    100 % es el tamaño normal. Sube para agrandar el logo o baja para reducirlo.
                  </span>
                </label>
                <input
                  type="text"
                  value={brandSettings.phoneNumber}
                  onChange={(event) => setBrandSettings({ ...brandSettings, phoneNumber: event.target.value })}
                  placeholder="Número de teléfono"
                  className="rounded-2xl border border-ink/15 px-4 py-3"
                />
                <label className="grid gap-1 text-sm font-semibold text-ink-soft">
                  Persona de contacto
                  <input
                    type="text"
                    value={brandSettings.contactName}
                    onChange={(event) => setBrandSettings({ ...brandSettings, contactName: event.target.value })}
                    placeholder="p. ej. María Pérez"
                    className="rounded-2xl border border-ink/15 px-4 py-3 font-normal text-ink"
                  />
                  <span className="text-xs font-normal">Quien atiende a los clientes por WhatsApp y en el planificador.</span>
                </label>
                <label className="grid gap-1 text-sm font-semibold text-ink-soft">
                  Nombre que usa la página
                  <select
                    value={brandSettings.namePreference ?? 'brand'}
                    onChange={(event) => setBrandSettings({ ...brandSettings, namePreference: event.target.value as 'brand' | 'contact' })}
                    className="rounded-2xl border border-ink/15 bg-white px-4 py-3 font-normal text-ink"
                  >
                    <option value="brand">El nombre del negocio</option>
                    <option value="contact">El nombre de la persona de contacto</option>
                  </select>
                  <span className="text-xs font-normal">
                    Para los textos generales (Nosotros, blog, preguntas frecuentes). Donde el contexto lo pide se usa el
                    adecuado: las páginas legales y el copyright llevan el del negocio; los mensajes personales («te
                    contactará personalmente», «¡Hola …!») el de la persona. Si uno de los dos falta, se usa el otro. En
                    los artículos del blog puedes escribir {'{{name}}'}, {'{{brand}}'} o {'{{contact}}'}.
                  </span>
                </label>
                <label className="grid gap-1 text-sm font-semibold text-ink-soft md:col-span-2">
                  Correo de contacto
                  <input
                    type="email"
                    value={brandSettings.contactEmail ?? ''}
                    onChange={(event) => setBrandSettings({ ...brandSettings, contactEmail: event.target.value })}
                    placeholder="reservas@tu-dominio.com"
                    className="rounded-2xl border border-ink/15 px-4 py-3 font-normal text-ink"
                  />
                  <span className="text-xs font-normal">
                    Aparece en la barra superior, el pie de página y las páginas legales (privacidad, términos,
                    cancelaciones). Vacío: se usa el de la página de contacto guardada.
                  </span>
                </label>
                <label className="grid gap-1 text-sm font-semibold text-ink-soft">
                  Sitio aliado para hoteles
                  <input
                    type="url"
                    value={brandSettings.partnerHotelsUrl ?? SITE_DEFAULTS.partners?.hotels ?? ''}
                    onChange={(event) => setBrandSettings({ ...brandSettings, partnerHotelsUrl: event.target.value })}
                    placeholder="https://… (vacío: se consulta por WhatsApp)"
                    className="rounded-2xl border border-ink/15 px-4 py-3 font-normal text-ink"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-ink-soft">
                  Sitio aliado para vuelos
                  <input
                    type="url"
                    value={brandSettings.partnerFlightsUrl ?? SITE_DEFAULTS.partners?.flights ?? ''}
                    onChange={(event) => setBrandSettings({ ...brandSettings, partnerFlightsUrl: event.target.value })}
                    placeholder="https://… (vacío: se consulta por WhatsApp)"
                    className="rounded-2xl border border-ink/15 px-4 py-3 font-normal text-ink"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-ink-soft">
                  Sitio aliado para cruceros
                  <input
                    type="url"
                    value={brandSettings.partnerCruisesUrl ?? SITE_DEFAULTS.partners?.cruises ?? ''}
                    onChange={(event) => setBrandSettings({ ...brandSettings, partnerCruisesUrl: event.target.value })}
                    placeholder="https://… (vacío: no se muestra)"
                    className="rounded-2xl border border-ink/15 px-4 py-3 font-normal text-ink"
                  />
                </label>
                <input
                  type="text"
                  value={brandSettings.paypalMeLink}
                  onChange={(event) => setBrandSettings({ ...brandSettings, paypalMeLink: event.target.value })}
                  placeholder="Enlace de PayPal"
                  className="rounded-2xl border border-ink/15 px-4 py-3 md:col-span-2"
                />
                <p className="md:col-span-2 rounded-2xl bg-paper-warm/60 px-4 py-3 text-sm text-ink-soft">
                  El fondo de la portada (fotos y videos) se cambia en{' '}
                  <a href="/admin/look" className="font-bold text-lagoon-dark underline">Admin › Aspecto</a>.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      await saveBrandSettings(brandSettings);
                      setEditingBrand(false);
                    }}
                    className="rounded-full bg-lagoon-dark px-5 py-2 font-semibold text-white"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingBrand(false)}
                    className="rounded-full bg-paper-deep px-5 py-2 font-semibold text-ink"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-ink-soft">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-md bg-paper-warm p-1 ring-1 ring-slate-200">
                    {brandSettings.brandicon ? (
                      <img src={brandSettings.brandicon} alt="Logo del negocio" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ink-light text-xs uppercase tracking-[.2em]">
                        Sin logo
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-ink-soft">Icono del menú, arriba a la izquierda</span>
                </div>
                <p><strong>Negocio:</strong> {brandSettings.brandName}</p>
                <p>
                  <strong>Nombre junto al logo:</strong>{' '}
                  {{ upper: 'en mayúsculas', asis: 'tal como está escrito', hidden: 'oculto' }[brandNameStyle(brandSettings)]}
                </p>
                <p><strong>Teléfono:</strong> {brandSettings.phoneNumber}</p>
                <p><strong>Contacto:</strong> {brandSettings.contactName || '—'}</p>
                <p>
                  <strong>Nombre en la página:</strong>{' '}
                  {brandSettings.namePreference === 'contact' ? 'el de la persona de contacto' : 'el del negocio'}
                </p>
                <p><strong>Correo:</strong> {brandSettings.contactEmail || 'el de la página de contacto'}</p>
                <p><strong>PayPal:</strong> {brandSettings.paypalMeLink}</p>
                <button onClick={() => setEditingBrand(true)} className="mt-4 rounded-full bg-lagoon-dark px-5 py-2 font-semibold text-white">
                  Editar datos del negocio
                </button>
              </div>
            )}

            {/* How the business takes money, and who can get in here at all.
                Both live with the brand settings because that is the page an
                operator opens to change "our" things. */}
            <PaymentSettingsPanel
              brandSettings={brandSettings}
              setBrandSettings={setBrandSettings}
            />
            <AdminPasswordPanel />
          </div>
        )}

        {/* Story Admin Section */}
        {activeSection === 'story' && <StoryAdmin />}

        {/* Tours Admin Section */}
        {activeSection === 'tours' && (
          <ServiceAdminPanel
            title="Excursiones"
            category="tours"
            services={tours}
            setServices={setTours}
            loadServices={loadTours}
            saveServices={(services) => saveTours(services, locale)}
            locale={locale}
            loadTranslation={(to) => getTours(to, true)}
            saveTranslation={(services, to) => saveTours(services, to)}
          />
        )}

        {/* Reviews Admin Section */}
        {activeSection === 'testimonials' && (
          <div className="rounded-3xl bg-paper p-6 shadow-lg border border-ink/15">
            <TestimonialsAdmin />
          </div>
        )}

        {/* Menus, buttons and headings, per language */}
        {activeSection === 'texts' && (
          <div className="rounded-3xl bg-paper p-6 shadow-lg border border-ink/15">
            <SiteTextsAdmin />
          </div>
        )}

        {/* TikTok Videos Admin Panel */}
        {activeSection === 'tiktok' && (
          <div className="rounded-3xl bg-paper-card p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <FaVideo className="text-3xl text-pink-600" />
              <h2 className="text-2xl font-bold text-ink">Videos de TikTok</h2>
            </div>
            <TikTokAdmin />
          </div>
        )}

        {/* Social Media Admin Panel */}
        {activeSection === 'social' && (
          <div className="rounded-3xl bg-paper-card p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <FaShareAlt className="text-3xl text-blue-600" />
              <h2 className="text-2xl font-bold text-ink">Redes sociales</h2>
            </div>
            <SocialMediaAdmin />
          </div>
        )}

        {/* AI Settings Section */}
        {activeSection === 'aiSettings' && (
          <div className="rounded-3xl bg-paper-card p-6 shadow-lg">
            <AIAssistantAdmin />
          </div>
        )}

        {/* AI Blog Gen Section */}
        {activeSection === 'aiBlogGen' && (
          <div className="rounded-3xl bg-paper p-6 shadow-lg border border-ink/15">
            <AIBlogGenAdmin />
          </div>
        )}
      </div>
      {pendingIconFile && (
        <BrandIconEditor
          file={pendingIconFile}
          busy={uploadingIcon}
          onCancel={() => setPendingIconFile(null)}
          onApply={handleBrandIconUpload}
        />
      )}

      {/* CSS-only styler for animated logos (webm / mp4 / animated webp). */}
      {stylingAnimatedLogo && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink/60 p-4" role="dialog" aria-modal="true" aria-label="Ajustar logo animado">
          <div className="w-full max-w-sm rounded-[22px] border border-ink/15 bg-paper p-6 shadow-ink-lg">
            <h3 className="mb-1 font-display text-xl font-semibold text-ink">Logo animado</h3>
            <p className="mb-5 text-xs text-ink-light">
              Los logos animados (WebM, MP4, WebP) se muestran tal cual. Aquí puedes ajustar su forma con CSS.
            </p>

            {/* Live preview */}
            <div className="mb-5 flex justify-center">
              {/\.(mp4|webm)(\?|$)/i.test(brandSettings.brandicon) ? (
                <video
                  src={brandSettings.brandicon}
                  autoPlay loop muted playsInline
                  className="h-24 w-24 object-contain"
                  style={{ borderRadius: `${brandSettings.logoCorners ?? 50}%` }}
                />
              ) : (
                <img
                  src={brandSettings.brandicon}
                  alt="Vista previa"
                  className="h-24 w-24 object-contain"
                  style={{ borderRadius: `${brandSettings.logoCorners ?? 50}%` }}
                />
              )}
            </div>

            <label className="mb-4 block text-sm font-semibold text-ink-soft">
              Redondeo de esquinas · {brandSettings.logoCorners ?? 50} %
              <span className="ml-2 text-xs font-normal">
                {(brandSettings.logoCorners ?? 50) === 0 ? '(cuadrado)' : (brandSettings.logoCorners ?? 50) === 50 ? '(pastilla/círculo)' : (brandSettings.logoCorners ?? 50) === 100 ? '(elipse completa)' : ''}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={brandSettings.logoCorners ?? 50}
                onChange={(event) => setBrandSettings({ ...brandSettings, logoCorners: Number(event.target.value) })}
                className="mt-1 w-full accent-[var(--mango-dark,#bd6f16)]"
              />
              <span className="flex justify-between text-[0.65rem] text-ink-light">
                <span>0 % cuadrado</span>
                <span>50 % pastilla</span>
                <span>100 % elipse</span>
              </span>
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setStylingAnimatedLogo(false)}
                className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={async () => {
                  await saveBrandSettings(brandSettings);
                  setStylingAnimatedLogo(false);
                }}
                className="rounded-full bg-lagoon-dark px-4 py-2 text-sm font-semibold text-white"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;

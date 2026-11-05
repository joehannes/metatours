import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaGripVertical, FaChevronDown, FaChevronUp, FaImage } from 'react-icons/fa';
import {
  getTransferConfig,
  saveTransferConfig,
  uploadVehicleImage,
  vehicleText,
} from '../../services/transferConfigService';
import type { TransferConfig, VehicleType } from '../../types/transport';
import { useI18n, SUPPORTED_LOCALES } from '../../contexts/I18nContext';

const sameCopy = (a: VehicleCopy, b: VehicleCopy) => a.label === b.label && a.description === b.description;
import TranslateBar from './TranslateBar';
import { useTranslationSync } from './useTranslationSync';
import { Lang, syncRecord } from '../../lib/autoTranslate';

/**
 * The fleet.
 *
 * Every other piece of this already existed — `VehicleType.image` in the type,
 * `uploadVehicleImage()` in the service, `/api/upload` on the Worker, and the
 * Transport page rendering `selectedVehicle.image` — but nothing ever put a
 * file picker on screen, so the images could not be set from the admin at all.
 * This is that missing half.
 *
 * Edits are held as a draft and written in one `saveTransferConfig` call, the
 * way the other panels here behave: the pricing numbers and the labels want to
 * be changed together and committed once. Uploads are the exception and happen
 * immediately, because an upload has to return a URL before there is anything
 * to put in the draft.
 *
 * Name and description are kept per language: the base fields are the text
 * every language falls back to, and "Traducciones" holds one copy per site
 * language. Saving translates the name and description of the vehicles
 * whose text this save changed — in the language the admin is viewed in —
 * into the others; every other vehicle's translations are left alone.
 */

type VehicleCopy = { label: string; description: string };

/** Keys are how a saved booking refers to a vehicle, so they have to be URL-safe. */

const BLANK: VehicleType = {
  key: '',
  label: '',
  multiplier: 1,
  pricePerKmMultiplier: 1,
  maxPassengers: 4,
  typicalPassengers: [1, 2],
  description: '',
  image: '',
};

const toKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

const VehicleAdminPanel: React.FC = () => {
  const { locale } = useI18n();
  const [config, setConfig] = useState<TransferConfig | null>(null);
  const [draft, setDraft] = useState<VehicleType[] | null>(null);
  /** The latest draft, for the translate strip, which saves once per language in a row. */
  const draftRef = useRef<VehicleType[] | null>(null);
  draftRef.current = draft;
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const sync = useTranslationSync(locale as Lang);

  // iPad drag-to-reorder and accordion state
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [thumbPreviews, setThumbPreviews] = useState<Record<number, string>>({});

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index || !draft) return;
    const reordered = [...draft];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setDraft(reordered);
    setDragIndex(index);
  }, [dragIndex, draft]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
  }, []);

  /** Show a local thumbnail immediately after file selection using FileReader. */
  const handleLocalImageSelect = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbPreviews((prev) => ({ ...prev, [index]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getTransferConfig().then((transferConfig) => {
      setConfig(transferConfig);
      setDraft(transferConfig.vehicleTypes.map((vt) => ({ ...vt })));
    });
  }, []);

  const updateTranslation = (index: number, lang: string, patch: Partial<VehicleCopy>) => {
    setDraft((current) =>
      current
        ? current.map((vt, i) =>
            i === index
              ? { ...vt, translations: { ...vt.translations, [lang]: { ...vt.translations?.[lang], ...patch } } }
              : vt
          )
        : current
    );
  };

  const update = (index: number, patch: Partial<VehicleType>) => {
    setDraft((current) =>
      current ? current.map((vt, i) => (i === index ? { ...vt, ...patch } : vt)) : current
    );
  };

  const handleUpload = async (index: number, file: File) => {
    setUploading(index);
    setMessage('');
    const url = await uploadVehicleImage(file);
    setUploading(null);
    if (!url) {
      // uploadVehicleImage swallows its own errors and returns '', so an empty
      // string is the only signal there is that something went wrong.
      setMessage('No se pudo subir la imagen. Revisa que sigues con la sesión abierta e inténtalo otra vez.');
      return;
    }
    update(index, { image: url });
  };

  const addVehicle = () => {
    setDraft((current) => (current ? [...current, { ...BLANK }] : [{ ...BLANK }]));
  };

  const removeVehicle = (index: number) => {
    setDraft((current) => (current ? current.filter((_, i) => i !== index) : current));
  };

  /** Validate and key a fleet, or say what is wrong with it. */
  const prepare = (vehicles: VehicleType[]): { ok: true; keyed: VehicleType[] } | { ok: false; error: string } => {
    const missingLabel = vehicles.findIndex((vt) => !vt.label.trim());
    if (missingLabel !== -1) {
      return { ok: false, error: `El vehículo ${missingLabel + 1} necesita un nombre antes de guardarlo.` };
    }

    // A blank key on a new vehicle is derived from its name; an existing key is
    // never rewritten, because saved bookings and the planner refer to it.
    const keyed = vehicles.map((vt) => ({ ...vt, key: vt.key || toKey(vt.label) }));

    const duplicate = keyed.find((vt, i) => keyed.findIndex((o) => o.key === vt.key) !== i);
    if (duplicate) {
      return { ok: false, error: `Dos vehículos comparten el id "${duplicate.key}" — cambia el nombre de uno.` };
    }
    return { ok: true, keyed };
  };

  const persist = async (vehicles: VehicleType[]): Promise<VehicleType[]> => {
    if (!config) throw new Error('La configuración aún no ha cargado.');
    const prepared = prepare(vehicles);
    if (!prepared.ok) throw new Error(prepared.error);
    await saveTransferConfig({ ...config, vehicleTypes: prepared.keyed });
    setConfig({ ...config, vehicleTypes: prepared.keyed });
    const next = prepared.keyed.map((vt) => ({ ...vt }));
    draftRef.current = next;
    setDraft(next);
    return prepared.keyed;
  };

  /**
   * Write some vehicles' copy in one language — into the config as it is in
   * storage now, not as this panel loaded it, so a price changed in the panel
   * below in the meantime is not put back.
   */
  const writeCopies = async (to: Lang, copies: Map<string, VehicleCopy>) => {
    const withCopy = (vt: VehicleType): VehicleType => {
      const copy = copies.get(vt.key);
      return copy ? { ...vt, translations: { ...vt.translations, [to]: copy } } : vt;
    };
    const fresh = await getTransferConfig(true);
    await saveTransferConfig({ ...fresh, vehicleTypes: fresh.vehicleTypes.map(withCopy) });
    setConfig((current) => (current ? { ...current, vehicleTypes: current.vehicleTypes.map(withCopy) } : current));
    setDraft((current) => {
      const next = current ? current.map(withCopy) : current;
      draftRef.current = next;
      return next;
    });
  };

  /** Only the vehicles whose name or description this save changed. */
  const carryVehicles = async (
    to: Lang,
    report: (line: string) => void,
    before: VehicleType[],
    after: VehicleType[]
  ): Promise<string | null> => {
    const changed = after.filter((vt) => {
      const prev = before.find((b) => b.key === vt.key);
      return !prev || !sameCopy(vehicleText(prev, locale), vehicleText(vt, locale));
    });
    if (changed.length === 0) return null;
    const copies = new Map<string, VehicleCopy>();
    for (const [i, vt] of changed.entries()) {
      report(`${i + 1}/${changed.length}`);
      const prev = before.find((b) => b.key === vt.key);
      const theirs = vt.translations?.[to];
      const existing = theirs?.label || theirs?.description ? vehicleText(vt, to) : undefined;
      const result = await syncRecord(
        prev ? vehicleText(prev, locale) : undefined,
        vehicleText(vt, locale),
        existing,
        locale as Lang,
        to
      );
      copies.set(vt.key, { label: result.value.label, description: result.value.description });
    }
    await writeCopies(to, copies);
    return `${copies.size} vehículo(s) traducido(s)`;
  };

  /** Only the vehicles that have no copy at all in that language. */
  const fillMissingVehicles = async (to: Lang, report: (line: string) => void): Promise<string | null> => {
    const missing = (draftRef.current ?? []).filter(
      (vt) => vt.key && !vt.translations?.[to]?.label?.trim() && vt.label.trim()
    );
    if (missing.length === 0) return null;
    const copies = new Map<string, VehicleCopy>();
    for (const [i, vt] of missing.entries()) {
      report(`${i + 1}/${missing.length}`);
      const result = await syncRecord(undefined, vehicleText(vt, locale), undefined, locale as Lang, to);
      copies.set(vt.key, { label: result.value.label, description: result.value.description });
    }
    await writeCopies(to, copies);
    return `${copies.size} vehículo(s) traducido(s)`;
  };

  const save = async () => {
    if (!config || !draft) return;
    setSaving(true);
    setMessage('');
    try {
      const before = config.vehicleTypes;
      const saved = await persist(draft);
      setMessage('Guardado.');
      void sync.afterSave((to, report) => carryVehicles(to, report, before, saved));
    } catch (error) {
      setMessage(`No se pudo guardar: ${(error as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!draft) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-slate-500">Cargando la flota…</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Vehículos</h2>
          <p className="mt-1 text-sm text-slate-500">
            La flota de la página de traslados. La foto es lo que ve el visitante al elegir el
            vehículo; el nombre y la descripción se muestran en su idioma.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span
              className={`text-sm font-semibold ${
                message === 'Guardado.' ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {message}
            </span>
          )}
          <button
            onClick={addVehicle}
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Agregar vehículo
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Guardar vehículos'}
          </button>
        </div>
      </div>

      <TranslateBar
        sync={sync}
        what="el nombre y la descripción de los vehículos que cambiaste"
        fillMissing={fillMissingVehicles}
        disabled={draft.length === 0}
      />

      {/* iPad-friendly inline editing list with drag-to-reorder and accordion expansion */}
      <div className="space-y-3">
        {draft.map((vehicle, index) => {
          const isExpanded = expandedIndex === index;
          const thumbSrc = thumbPreviews[index] || vehicle.image;
          return (
            <div
              key={vehicle.key || index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`admin-panel rounded-2xl border bg-white shadow-sm transition-all ${
                dragIndex === index ? 'admin-card-dragging border-lagoon-light' : 'border-slate-200'
              }`}
            >
              {/* Collapsed row: drag handle + thumbnail + name + passengers + expand toggle */}
              <div className="flex items-center gap-3 p-3">
                <div
                  className="admin-drag-handle flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400"
                  aria-label="Arrastrar para reordenar"
                >
                  <FaGripVertical className="h-5 w-5" />
                </div>
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {thumbSrc ? (
                    <img src={thumbSrc} alt="" className="admin-thumb-preview h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <FaImage className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-slate-900">{vehicle.label || 'Sin nombre'}</h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {vehicle.maxPassengers} pasajeros · ×{vehicle.multiplier}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-lagoon-light hover:text-slate-900"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                >
                  {isExpanded ? <FaChevronUp className="h-5 w-5" /> : <FaChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {/* Expanded inline edit section */}
              <div
                className="admin-inline-edit border-t border-slate-200"
                data-expanded={isExpanded ? 'true' : 'false'}
              >
                <div className="space-y-4 p-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[140px,1fr]">
                    {/* Thumbnail upload area */}
                    <div className="space-y-2">
                      <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                        {thumbSrc ? (
                          <img src={thumbSrc} alt={vehicle.label || 'Vehicle'} className="h-full w-full object-cover" />
                        ) : (
                          <span className="px-2 text-center text-xs uppercase tracking-[0.18em] text-slate-400">Sin foto</span>
                        )}
                      </div>
                      <label className="flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 transition hover:border-lagoon hover:text-slate-900">
                        {uploading === index ? 'Subiendo…' : 'Subir foto'}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploading === index}
                          className="hidden"
                          onChange={async (event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              handleLocalImageSelect(index, file);
                              await handleUpload(index, file);
                            }
                            event.target.value = '';
                          }}
                        />
                      </label>
                      <input
                        type="url"
                        inputMode="url"
                        value={vehicle.image ?? ''}
                        onChange={(event) => update(index, { image: event.target.value })}
                        placeholder="…o pega el enlace"
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                      />
                    </div>

                    {/* Form fields */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nombre</span>
                          <input
                            type="text"
                            value={vehicle.label}
                            onChange={(event) => update(index, { label: event.target.value })}
                            placeholder="SUV / Familiar"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                          />
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Id {vehicle.key && <span className="normal-case">(fijo)</span>}
                          </span>
                          <input
                            type="text"
                            value={vehicle.key}
                            onChange={(event) => update(index, { key: toKey(event.target.value) })}
                            placeholder="sale del nombre"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-base"
                          />
                        </label>
                      </div>

                      <label className="block space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Descripción</span>
                        <textarea
                          value={vehicle.description}
                          onChange={(event) => update(index, { description: event.target.value })}
                          rows={2}
                          placeholder="Amplia para familias o grupos de hasta 5"
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                        />
                      </label>

                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                        <label className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pasajeros máx</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            min="1"
                            value={vehicle.maxPassengers}
                            onChange={(event) =>
                              update(index, { maxPassengers: Math.max(1, Number(event.target.value) || 1) })
                            }
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                          />
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Multiplicador</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            step="0.05"
                            min="0"
                            value={vehicle.multiplier}
                            onChange={(event) =>
                              update(index, { multiplier: Math.max(0, Number(event.target.value) || 0) })
                            }
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                          />
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">× por km</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            step="0.05"
                            min="0"
                            value={vehicle.pricePerKmMultiplier ?? 1}
                            onChange={(event) =>
                              update(index, {
                                pricePerKmMultiplier: Math.max(0, Number(event.target.value) || 0),
                              })
                            }
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                          />
                        </label>
                      </div>

                      <details className="rounded-2xl border border-slate-200 px-4 py-3">
                        <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-slate-500">
                          Traducciones ({SUPPORTED_LOCALES.map((l) => l.toUpperCase()).join(' · ')})
                        </summary>
                        <div className="mt-3 space-y-3">
                          {SUPPORTED_LOCALES.map((lang) => (
                            <div key={lang} className="grid grid-cols-1 gap-2 sm:grid-cols-[3rem,1fr,2fr] sm:items-start">
                              <span className="pt-3 text-xs font-bold text-slate-500">{lang.toUpperCase()}</span>
                              <input
                                type="text"
                                value={vehicle.translations?.[lang]?.label ?? ''}
                                onChange={(event) => updateTranslation(index, lang, { label: event.target.value })}
                                placeholder={vehicle.label || 'Nombre'}
                                aria-label={`Nombre (${lang})`}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                              />
                              <textarea
                                value={vehicle.translations?.[lang]?.description ?? ''}
                                onChange={(event) => updateTranslation(index, lang, { description: event.target.value })}
                                placeholder={vehicle.description || 'Descripción'}
                                aria-label={`Descripción (${lang})`}
                                rows={2}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base"
                              />
                            </div>
                          ))}
                        </div>
                      </details>

                      <button
                        onClick={() => removeVehicle(index)}
                        className="min-h-[48px] w-full rounded-2xl border border-rose-200 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50"
                      >
                        Quitar vehículo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {draft.length === 0 && (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
          No hay vehículos. Agrega uno, o guarda la flota vacía para volver a los valores por defecto.
        </p>
      )}
    </section>
  );
};

export default VehicleAdminPanel;

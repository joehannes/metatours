/**
 * Leaflet global type declaration.
 *
 * Leaflet is loaded dynamically at runtime via a script tag (see RouteMap.tsx),
 * so there's no importable module. This declares the global `L` on Window so
 * TypeScript accepts `window.L` without TS2339.
 */

interface Window {
  L: typeof import('leaflet');
}
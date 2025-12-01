declare namespace L {
  type LatLngExpression = [number, number];

  function map(element: HTMLElement, options?: MapOptions): Map;
  function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;
  function marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;
  function divIcon(options: DivIconOptions): DivIcon;
  function latLngBounds(): LatLngBounds;

  interface MapOptions {
    zoomControl?: boolean;
    attributionControl?: boolean;
    dragging?: boolean;
    scrollWheelZoom?: boolean;
    doubleClickZoom?: boolean;
    zoomSnap?: number;
  }

  interface FlyToOptions {
    duration?: number;
    easeLinearity?: number;
    animate?: boolean;
    maxZoom?: number;
    paddingTopLeft?: [number, number];
    paddingBottomRight?: [number, number];
  }

  interface FitBoundsOptions extends FlyToOptions {}

  interface TileLayerOptions {
    maxZoom?: number;
    opacity?: number;
  }

  interface Map {
    setView(center: LatLngExpression, zoom: number): this;
    flyTo(center: LatLngExpression, zoom: number, options?: FlyToOptions): this;
    flyToBounds(bounds: LatLngBounds, options?: FitBoundsOptions): this;
    remove(): void;
    removeLayer(layer: Layer): this;
    addLayer(layer: Layer): this;
    on(type: string, fn: (...args: any[]) => void): this;
    dragging: Handler;
    scrollWheelZoom: Handler;
    doubleClickZoom: Handler;
    touchZoom: Handler;
  }

  interface Handler {
    enable(): this;
    disable(): this;
  }

  interface Layer {}

  interface Marker extends Layer {
    on(type: string, fn: (...args: any[]) => void): this;
  }

  interface MarkerOptions {
    icon?: DivIcon;
  }

  interface DivIconOptions {
    className?: string;
    html?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
  }

  interface DivIcon {}

  interface LatLngBounds {
    extend(latlng: LatLngExpression): this;
    isValid(): boolean;
  }

  const DomEvent: {
    stopPropagation(event: any): void;
  };
}

declare global {
  interface Window {
    L: typeof L;
  }
}

export {};

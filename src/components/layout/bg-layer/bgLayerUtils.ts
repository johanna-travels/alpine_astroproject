/**
 * Bg-layer scaffold — pure config and style helpers for the top/bottom edge overlays.
 * Rebuild the Astro (or React) component against these exports.
 */

export interface BgLayerConfig {
  blurLayers?: number;
  blurMax?: number;
  blurSize?: number;
  tintColor?: string;
}

export const defaultBgLayerConfig: Required<BgLayerConfig> = {
  blurLayers: 5,
  blurMax: 16,
  blurSize: 35,
  tintColor: '#F5F2EB',
};

export type BgLayerEdge = 'top' | 'bottom';

export function resolveBgLayerConfig(config: BgLayerConfig = {}): Required<BgLayerConfig> {
  return { ...defaultBgLayerConfig, ...config };
}

export function getEdgeHeight(edge: BgLayerEdge, blurSize: number): number {
  return edge === 'top' ? blurSize : blurSize / 2;
}

export function getLayerBlurPx(layerIndex: number, blurLayers: number, blurMax: number): number {
  return Math.sin(((blurLayers - (layerIndex + 1)) / blurLayers) * (Math.PI / 2)) * blurMax;
}

export function getLayerMaskGradient(edge: BgLayerEdge, layerIndex: number, blurLayers: number): string {
  const stop = ((layerIndex + 1) / blurLayers) * 100;
  const direction = edge === 'top' ? 'to bottom' : 'to top';
  return `linear-gradient(${direction}, black, transparent ${stop}%)`;
}

export function getTintGradient(edge: BgLayerEdge, tintColor: string): string {
  const direction = edge === 'top' ? 'to bottom' : 'to top';
  return `linear-gradient(${direction}, ${tintColor} 0%, ${tintColor}99 40%, transparent 100%)`;
}

export function buildBgLayerInlineStyle(
  layerIndex: number,
  edge: BgLayerEdge,
  config: Required<BgLayerConfig>,
): string {
  const blur = getLayerBlurPx(layerIndex, config.blurLayers, config.blurMax);
  const mask = getLayerMaskGradient(edge, layerIndex, config.blurLayers);
  return [
    `backdrop-filter: blur(${blur}px)`,
    `-webkit-backdrop-filter: blur(${blur}px)`,
    `mask-image: ${mask}`,
    `-webkit-mask-image: ${mask}`,
  ].join('; ');
}

export function createBgLayerIndices(blurLayers: number): number[] {
  return Array.from({ length: blurLayers }, (_, i) => i);
}

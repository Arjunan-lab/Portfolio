import type Lenis from 'lenis';

declare module 'lenis' {
  interface Lenis {
    version?: string;
    horizontal?: boolean;
    snap?: boolean;
    touch?: boolean;
    velocity?: number;
  }
}

declare module 'split-type' {
  export interface SplitTypeOptions {
    types?: string;
    tagName?: string;
    splitClass?: string;
    lineClass?: string;
    wordClass?: string;
    charClass?: string;
    split?: string | string[];
    absolute?: boolean;
  }
  export default class SplitType {
    constructor(target: string | Element | Element[] | NodeList, options?: SplitTypeOptions);
    lines: HTMLElement[] | null;
    words: HTMLElement[] | null;
    chars: HTMLElement[] | null;
    elements: HTMLElement[];
    split(options?: SplitTypeOptions): this;
    revert(): void;
  }
}

declare global {
  interface Window {
    lenis: (Lenis & {
      version?: string;
      horizontal?: boolean;
      snap?: boolean;
      touch?: boolean;
      velocity?: number;
    }) | null | undefined;
    __LITE_MODE__?: boolean;
    __MOTION_DEBUG__?: boolean;
  }
}

export {};

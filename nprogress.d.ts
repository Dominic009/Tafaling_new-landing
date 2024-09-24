// nprogress.d.ts
declare module "nprogress" {
  interface NProgressOptions {
    minimum?: number;
    template?: string;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
  }

  const NProgress: {
    start(): void;
    done(): void;
    set(n: number): void;
    inc(amount?: number): void;
    configure(options: NProgressOptions): void;
    remove(): void;
  };

  export default NProgress;
}

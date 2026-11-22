import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`ErrorBoundary caught error in [${this.props.name || 'Component'}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full min-h-[220px] flex flex-col items-center justify-center p-6 rounded-2xl bg-[#14161E] border border-border-dark text-center space-y-3">
          <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-mono text-sm">
            !
          </div>
          <p className="font-mono text-xs text-gray-300 uppercase tracking-wider">
            Rendering Fallback — {this.props.name || 'Visual Canvas'}
          </p>
          <p className="text-xs text-text-muted font-sans max-w-sm">
            {this.state.error?.message || 'WebGL acceleration failed or is unavailable in this environment.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-1.5 rounded-full border border-border-dark hover:border-cobalt text-xs font-mono text-white transition-colors"
          >
            Retry Render
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

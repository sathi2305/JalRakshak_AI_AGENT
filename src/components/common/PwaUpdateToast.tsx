import React from 'react';
import { RefreshCw, Sparkles, X, ShieldCheck } from 'lucide-react';

interface PwaUpdateToastProps {
  isOpen: boolean;
  onRefresh: () => void;
  onDismiss: () => void;
}

export const PwaUpdateToast: React.FC<PwaUpdateToastProps> = ({
  isOpen,
  onRefresh,
  onDismiss
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-md w-[calc(100%-2rem)] sm:w-auto animate-in slide-in-from-bottom-5 fade-in duration-300 select-none shadow-2xl print:hidden"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 border border-cyan-500/50 shadow-cyan-900/30 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/30">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Update Available</span>
            </h4>
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold px-1.5 py-0.2 rounded-full">
              PWA v3
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-1 leading-snug">
            A new version of <span className="font-semibold text-white">JalRakshak AI</span> has finished installing in the background. Refresh to update now.
          </p>

          <div className="flex items-center gap-2.5 mt-3">
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/25 cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh App</span>
            </button>

            <button
              onClick={onDismiss}
              className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
            >
              Later
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer -mt-1 -mr-1"
          aria-label="Dismiss update notification"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

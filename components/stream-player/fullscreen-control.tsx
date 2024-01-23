"use client";

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullscreenControl = ({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} side="top" asChild>
        <button
          onClick={onToggle}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};

"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ChatTrigger({ children, className }: Props) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
    >
      {children}
    </button>
  );
}

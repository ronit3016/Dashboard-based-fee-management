"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ModalFormProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  children: React.ReactNode;
  submitText?: string;
  isSubmitting?: boolean;
}

export function ModalForm({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  children,
  submitText = "Save",
  isSubmitting = false,
}: ModalFormProps) {
  const handleInteractOutside = (e: Event) => {
    e.preventDefault(); // allow clicking outside if we want strict close, but shadcn defaults to close.
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-md rounded-2xl bg-white border border-orange-900/10 shadow-2xl animate-in zoom-in-95 fade-in duration-200"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-heading text-amber-950">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-slate-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6 pt-4">
          {children}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                submitText
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function NewsletterForm() {
  return (
    <form>
      <h3 className="font-display text-2xl font-light">Restez inspiré</h3>
      <p className="mt-2 mb-5 text-sm text-primary-foreground/65">
        Recevez nos dernières créations et inspirations événementielles.
      </p>
      <div className="flex items-center gap-2 border-b border-primary-foreground/25 pb-1 focus-within:border-accent">
        <Input
          type="email"
          placeholder="Votre adresse email"
          className="h-11 flex-1 border-0 bg-transparent px-0 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-0"
        />
        <Button
          type="submit"
          variant="link"
          className="shrink-0 text-[11px] font-medium uppercase tracking-luxe text-accent"
        >
          S&apos;inscrire →
        </Button>
      </div>
    </form>
  );
}

export default NewsletterForm;

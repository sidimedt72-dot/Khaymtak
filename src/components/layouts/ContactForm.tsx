"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  "Mariage",
  "Réception privée",
  "Événement d'entreprise",
  "Salon & exposition",
  "Autre",
];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-luxe text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const fieldClass =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base focus-visible:ring-0 focus-visible:border-accent placeholder:text-muted-foreground/60";

export function ContactForm() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    // Simulated submission — wire to your CRM / email endpoint here.
    await new Promise((r) => setTimeout(r, 900));
    setPending(false);
    (e.target as HTMLFormElement).reset();
    setEventType(EVENT_TYPES[0]);
    toast({
      title: "Demande envoyée",
      description:
        "Merci. Notre équipe vous recontacte sous 24h pour composer votre événement.",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Nom complet">
          <Input required name="name" placeholder="Votre nom" className={fieldClass} />
        </Field>
        <Field label="Email">
          <Input
            required
            type="email"
            name="email"
            placeholder="vous@exemple.com"
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Téléphone">
          <Input
            name="phone"
            type="tel"
            placeholder="+33 6 00 00 00 00"
            className={fieldClass}
          />
        </Field>
        <Field label="Type d'événement">
          <div className="flex flex-wrap gap-2 pt-2">
            {EVENT_TYPES.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setEventType(type)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                  eventType === type
                    ? "border-accent bg-accent/10 text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent/50",
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <input type="hidden" name="eventType" value={eventType} />
        </Field>
      </div>

      <Field label="Votre projet">
        <Textarea
          name="message"
          rows={4}
          placeholder="Parlez-nous de votre vision, votre date et le nombre d'invités…"
          className="rounded-none border-0 border-b border-border bg-transparent px-0 text-base focus-visible:border-accent focus-visible:ring-0 placeholder:text-muted-foreground/60"
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="group h-14 w-full rounded-full bg-primary px-8 text-sm font-medium uppercase tracking-luxe text-primary-foreground hover:bg-primary/90 sm:w-auto"
      >
        {pending ? "Envoi en cours…" : "Demander un devis sur-mesure"}
        {!pending && (
          <span className="ml-3 transition-transform group-hover:translate-x-1">
            →
          </span>
        )}
      </Button>
    </form>
  );
}

export default ContactForm;

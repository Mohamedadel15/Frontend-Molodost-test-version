"use client";

import { useState, type SyntheticEvent } from "react";

import { Button } from "@/components/ui/Button/Button";
import type { Country } from "@/config/markets";
import type { Dictionary } from "@/types/dictionary";
import { cn } from "@/lib/cn";

interface ConsultationFormProps {
  country: Country;
  forms: Dictionary["forms"];
  /** Localized market names for the clinic-location select. */
  countryNames: Dictionary["navigation"]["switcher"]["countries"];
}

/*
 * Production field: 40px tall, 16px/170%, no side borders, a 1px bottom rule
 * at 16% of the secondary tone that darkens to the full tone on focus (300ms
 * ease-in-out), placeholder in the muted tone.
 */
const inputClasses = cn(
  "h-10 w-full border-b border-[rgba(83,89,86,0.16)] bg-transparent text-body text-secondary",
  "transition-colors duration-300 ease-(--ease-inout) placeholder:text-muted",
  "focus:border-secondary focus:outline-none",
);

/*
 * Production checkbox: 20px, 4px radius, accent at 20% unchecked, solid accent
 * with a white check when checked.
 */
const checkboxClasses = cn(
  "size-5 shrink-0 appearance-none rounded-[4px] bg-accent/20 bg-center bg-no-repeat",
  "transition-colors duration-(--motion-fast) checked:bg-accent",
  "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m5 10.5 3.2 3L15 7%22/></svg>')]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
);

/*
 * Consultation form (production Book A Session form): a 480px column, blocks
 * 64px apart; each block opens on the 28px/500 heading with 48px to its first
 * field; fields 32px apart, checkboxes 24px apart. The newsletter opt-in and
 * the consent line sit in 14px, the submit pill spans the column.
 * Submission endpoint is pending (Open Questions #3) — the submit handler
 * currently confirms locally without a network call.
 */
export function ConsultationForm({
  country,
  forms,
  countryNames,
}: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-[480px] flex-col gap-16" data-pending="endpoint">
      <fieldset className="flex flex-col gap-8">
        <legend className="mb-12 text-sans-sm text-primary">{forms.tellUsAboutYou}</legend>
        <label>
          <span className="sr-only">{forms.namePlaceholder}</span>
          <input type="text" name="name" required placeholder={forms.namePlaceholder} className={inputClasses} />
        </label>
        <label>
          <span className="sr-only">{forms.emailPlaceholder}</span>
          <input type="email" name="email" required placeholder={forms.emailPlaceholder} className={inputClasses} />
        </label>
        <label>
          <span className="sr-only">{forms.phonePlaceholder}</span>
          <input type="tel" name="phone" placeholder={forms.phonePlaceholder} className={inputClasses} />
        </label>
        <label>
          <span className="sr-only">{forms.pronouns}</span>
          <select name="pronouns" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              {forms.pronouns}
            </option>
            {forms.pronounOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">{forms.clinicLocation}</span>
          <select name="location" required defaultValue={country} className={inputClasses}>
            <option value="" disabled>
              {forms.clinicLocation}
            </option>
            <option value="ae">{countryNames.ae}</option>
            <option value="eg">{countryNames.eg}</option>
          </select>
        </label>
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className="mb-12 text-sans-sm text-primary">{forms.optimizeTitle}</legend>
        <textarea
          name="details"
          rows={3}
          placeholder={forms.optimizePlaceholder}
          className={cn(inputClasses, "h-auto min-h-[120px] resize-y")}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="mb-12 text-sans-sm text-primary">{forms.interestTitle}</legend>
        {forms.interestOptions.map((option) => (
          <label key={option} className="flex items-center gap-4">
            <input type="checkbox" name="interests" value={option} className={checkboxClasses} />
            <span className="text-body-sm text-secondary">{option}</span>
          </label>
        ))}
      </fieldset>

      <label>
        <span className="sr-only">{forms.hearAbout}</span>
        <select name="source" required defaultValue="" className={inputClasses}>
          <option value="" disabled>
            {forms.hearAbout}
          </option>
          {forms.hearAboutOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-6">
        <label className="flex items-center gap-4">
          <input type="checkbox" name="updates" className={checkboxClasses} />
          <span className="text-body-sm text-secondary">{forms.updatesTitle}</span>
        </label>
        <p className="text-body-sm text-muted">{forms.updatesBody}</p>
        <p className="text-body-sm text-muted">{forms.consent}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" variant="navy" className="w-full">
          {forms.submit}
        </Button>
        <span aria-live="polite" className="text-body-sm text-accent">
          {submitted ? "✓" : ""}
        </span>
      </div>
    </form>
  );
}

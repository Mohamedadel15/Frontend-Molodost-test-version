"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button/Button";
import type { Country } from "@/config/markets";
import type { Dictionary } from "@/types/dictionary";

interface ConsultationFormProps {
  country: Country;
  forms: Dictionary["forms"];
  /** Localized market names for the clinic-location select. */
  countryNames: Dictionary["navigation"]["switcher"]["countries"];
}

const inputClasses =
  "w-full border-b border-primary/20 bg-transparent pb-3 text-body text-primary transition-colors duration-(--motion-fast) placeholder:text-muted focus:border-accent focus:outline-none";

/*
 * Consultation form (design-inventory §8): underline fields, market-aware
 * default location. Submission endpoint is pending (Open Questions #3) —
 * the submit handler currently confirms locally without a network call.
 */
export function ConsultationForm({
  country,
  forms,
  countryNames,
}: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-12" data-pending="endpoint">
      <fieldset className="flex flex-col gap-8">
        <legend className="text-sans-md text-primary">
          {forms.tellUsAboutYou}
        </legend>
        <label>
          <span className="sr-only">{forms.namePlaceholder}</span>
          <input
            type="text"
            name="name"
            required
            placeholder={forms.namePlaceholder}
            className={inputClasses}
          />
        </label>
        <label>
          <span className="sr-only">{forms.emailPlaceholder}</span>
          <input
            type="email"
            name="email"
            required
            placeholder={forms.emailPlaceholder}
            className={inputClasses}
          />
        </label>
        <label>
          <span className="sr-only">{forms.phonePlaceholder}</span>
          <input
            type="tel"
            name="phone"
            placeholder={forms.phonePlaceholder}
            className={inputClasses}
          />
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
          <select
            name="location"
            required
            defaultValue={country}
            className={inputClasses}
          >
            <option value="" disabled>
              {forms.clinicLocation}
            </option>
            <option value="ae">{countryNames.ae}</option>
            <option value="eg">{countryNames.eg}</option>
          </select>
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="text-sans-md text-primary">
          {forms.optimizeTitle}
        </legend>
        <textarea
          name="details"
          rows={3}
          placeholder={forms.optimizePlaceholder}
          className={inputClasses}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-2 text-sans-md text-primary">
          {forms.interestTitle}
        </legend>
        {forms.interestOptions.map((option) => (
          <label key={option} className="flex items-center gap-4">
            <input
              type="checkbox"
              name="interests"
              value={option}
              className="size-[18px] shrink-0 appearance-none border border-primary/30 bg-transparent transition-colors duration-(--motion-fast) checked:border-accent checked:bg-accent"
            />
            <span className="text-body text-primary">{option}</span>
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

      <fieldset className="flex flex-col gap-4">
        <legend className="text-body font-semibold text-primary">
          {forms.updatesTitle}
        </legend>
        <label className="flex items-start gap-4">
          <input
            type="checkbox"
            name="updates"
            className="mt-1 size-[18px] shrink-0 appearance-none border border-primary/30 bg-transparent transition-colors duration-(--motion-fast) checked:border-accent checked:bg-accent"
          />
          <span className="text-body-sm text-secondary">{forms.updatesBody}</span>
        </label>
      </fieldset>

      <p className="text-body-sm text-secondary">{forms.consent}</p>

      <div className="flex items-center gap-6">
        <Button type="submit" variant="navy">
          {forms.submit}
        </Button>
        <span
          aria-live="polite"
          className="text-body-sm text-accent"
        >
          {submitted ? "✓" : ""}
        </span>
      </div>
    </form>
  );
}

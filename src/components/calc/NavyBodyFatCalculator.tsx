"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { SegmentedToggle } from "@/components/calc/SegmentedToggle";
import {
  CM_PER_IN,
  LIMITS,
  getBodyFatCategory,
  getNavyStandard,
  navyBodyFat,
  type Sex,
  type Unit,
} from "@/lib/navyBodyFat";

type FieldKey = "age" | "height" | "neck" | "waist" | "hip";
type Errors = Partial<Record<FieldKey | "form", string>>;

interface Result {
  bodyFat: number;
  category: string;
  unit: Unit;
  ageProvided: boolean;
  standard: { label: string; max: number } | null;
  overMax: boolean;
}

const FIELD_NAMES: Record<Exclude<FieldKey, "age">, string> = {
  height: "height",
  neck: "neck measurement",
  waist: "waist measurement",
  hip: "hip measurement",
};

function convertValue(value: string, factor: number): string {
  const n = parseFloat(value);
  return Number.isFinite(n) ? String(Math.round(n * factor * 10) / 10) : value;
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  suffix,
  placeholder,
  step = "0.1",
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  suffix: string;
  placeholder?: string;
  step?: string;
}) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${hintId} ${errorId}` : hintId}
          className={cn(
            "h-11 w-full rounded-xl border bg-white pl-3 pr-11 text-sm text-ink-900 outline-none focus:ring-2",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-border focus:border-brand-500 focus:ring-brand-100"
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-ink-400"
        >
          {suffix}
        </span>
      </div>
      <p id={hintId} className="mt-1.5 text-xs leading-snug text-ink-400">
        {hint}
      </p>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-start gap-1 text-xs text-red-600"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

export function NavyBodyFatCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result | null>(null);

  const suffix = unit === "metric" ? "cm" : "in";

  function handleUnitChange(next: Unit) {
    if (next === unit) return;
    const factor = next === "metric" ? CM_PER_IN : 1 / CM_PER_IN;
    setHeight((v) => convertValue(v, factor));
    setNeck((v) => convertValue(v, factor));
    setWaist((v) => convertValue(v, factor));
    setHip((v) => convertValue(v, factor));
    setUnit(next);
    setErrors({});
    setResult(null);
  }

  function handleSexChange(next: Sex) {
    setSex(next);
    setErrors({});
    setResult(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const raw = { height, neck, waist, hip };
    const required: Exclude<FieldKey, "age">[] =
      sex === "male" ? ["height", "neck", "waist"] : ["height", "neck", "waist", "hip"];
    const nextErrors: Errors = {};
    const values: Partial<Record<Exclude<FieldKey, "age">, number>> = {};

    for (const key of required) {
      const n = parseFloat(raw[key]);
      const { min, max } = LIMITS[unit][key];
      if (!Number.isFinite(n)) {
        nextErrors[key] = `Enter your ${FIELD_NAMES[key]}.`;
      } else if (n < min || n > max) {
        nextErrors[key] = `Enter a value between ${min} and ${max} ${suffix}.`;
      } else {
        values[key] = n;
      }
    }

    let ageValue: number | null = null;
    if (age.trim() !== "") {
      const a = parseFloat(age);
      if (!Number.isFinite(a) || a < 10 || a > 100) {
        nextErrors.age = "Enter an age between 10 and 100, or leave it blank.";
      } else {
        ageValue = a;
      }
    }

    // log10 needs a positive argument: waist - neck (men) or waist + hip - neck (women).
    if (
      !nextErrors.neck &&
      !nextErrors.waist &&
      !nextErrors.hip &&
      values.neck !== undefined &&
      values.waist !== undefined
    ) {
      const diff =
        sex === "male"
          ? values.waist - values.neck
          : values.waist + (values.hip ?? 0) - values.neck;
      if (diff <= 0) {
        nextErrors.neck =
          sex === "male"
            ? "Neck must be smaller than your abdomen measurement. Recheck both."
            : "Neck must be smaller than your waist plus hip measurements. Recheck them.";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const bodyFat = navyBodyFat(sex, unit, {
      height: values.height!,
      neck: values.neck!,
      waist: values.waist!,
      hip: values.hip,
    });

    if (!Number.isFinite(bodyFat) || bodyFat < 1 || bodyFat > 70) {
      setErrors({
        form: "These measurements produce an unrealistic result. Recheck each measurement and confirm the unit toggle matches your tape.",
      });
      setResult(null);
      return;
    }

    const rounded = Math.round(bodyFat * 10) / 10;
    const standard = ageValue !== null ? getNavyStandard(ageValue, sex) : null;

    setErrors({});
    setResult({
      bodyFat: rounded,
      category: getBodyFatCategory(rounded, sex),
      unit,
      ageProvided: ageValue !== null,
      standard,
      overMax: standard ? rounded > standard.max : false,
    });
  }

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_1px_0_0_rgba(11,14,23,0.03)] sm:p-8">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            Enter your measurements
          </h2>
          <SegmentedToggle<Unit>
            ariaLabel="Unit system"
            value={unit}
            onChange={handleUnitChange}
            options={[
              { value: "imperial", label: "Imperial (in)" },
              { value: "metric", label: "Metric (cm)" },
            ]}
          />
        </div>

        <div className="mt-6">
          <span className="text-sm font-medium text-ink-700">
            Sex
          </span>
          <div className="mt-2">
            <SegmentedToggle<Sex>
              ariaLabel="Sex"
              value={sex}
              onChange={handleSexChange}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            id="navy-age"
            label="Age (optional)"
            hint="Only used to compare with the Navy's maximum standards."
            value={age}
            onChange={setAge}
            error={errors.age}
            suffix="yrs"
            step="1"
            placeholder="e.g. 28"
          />
          <Field
            id="navy-height"
            label="Height"
            hint="Barefoot, standing straight."
            value={height}
            onChange={setHeight}
            error={errors.height}
            suffix={suffix}
            placeholder={unit === "metric" ? "e.g. 178" : "e.g. 70"}
          />
          <Field
            id="navy-neck"
            label="Neck circumference"
            hint="Just below the larynx (Adam's apple)."
            value={neck}
            onChange={setNeck}
            error={errors.neck}
            suffix={suffix}
            placeholder={unit === "metric" ? "e.g. 38" : "e.g. 15"}
          />
          <Field
            id="navy-waist"
            label={sex === "male" ? "Abdomen circumference" : "Waist circumference"}
            hint={
              sex === "male"
                ? "Level with your navel, at the end of a normal exhale."
                : "At the narrowest point of your torso, at the end of a normal exhale."
            }
            value={waist}
            onChange={setWaist}
            error={errors.waist}
            suffix={suffix}
            placeholder={unit === "metric" ? "e.g. 86" : "e.g. 34"}
          />
          {sex === "female" && (
            <Field
              id="navy-hip"
              label="Hip circumference"
              hint="Around the widest part of your hips and buttocks."
              value={hip}
              onChange={setHip}
              error={errors.hip}
              suffix={suffix}
              placeholder={unit === "metric" ? "e.g. 97" : "e.g. 38"}
            />
          )}
        </div>

        {errors.form && (
          <p
            role="alert"
            className="mt-5 flex items-start gap-1.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> {errors.form}
          </p>
        )}

        <button
          type="submit"
          className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700 sm:w-auto"
        >
          <Calculator className="size-4" />
          Calculate body fat
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
          className="mt-8 border-t border-border pt-8"
        >
          <div className="rounded-2xl bg-muted p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              Estimated body fat
            </p>
            <p className="font-display mt-2 text-5xl font-bold text-brand-600">
              {result.bodyFat.toFixed(1)}%
            </p>
            <p className="mt-3 text-sm text-ink-700">
              General category:{" "}
              <strong className="font-semibold text-ink-900">{result.category}</strong>
            </p>
            <p className="mt-1 text-xs text-ink-400">
              Typical margin of error is about 3–4 percentage points.
            </p>
          </div>

          {result.ageProvided && (
            <div className="mt-4 rounded-2xl border border-border p-4 text-sm leading-relaxed text-ink-500">
              <p className="font-medium text-ink-900">US Navy standard</p>
              {result.standard ? (
                <p className="mt-1">
                  {result.overMax
                    ? "Above the Navy's maximum for your age group"
                    : "Within the Navy's maximum for your age group"}{" "}
                  (ages {result.standard.label}: {result.standard.max}% maximum).
                </p>
              ) : (
                <p className="mt-1">
                  The Navy&apos;s body fat standards start at age 18, so no
                  comparison is shown for this age.
                </p>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-ink-400">
            Calculated with the US Navy formula for{" "}
            {result.unit === "metric" ? "centimeters" : "inches"}.
          </p>
        </motion.div>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BSA_FORMULAS, inToCm, lbToKg } from "@/lib/bsa";

type Unit = "metric" | "imperial";
type Sex = "male" | "female";

interface FormErrors {
  weight?: string;
  height?: string;
}

interface BsaResult {
  key: string;
  label: string;
  note: string;
  value: number;
}

const MIN_WEIGHT_KG = 0;
const MAX_WEIGHT_KG = 500;
const MIN_HEIGHT_CM = 0;
const MAX_HEIGHT_CM = 300;

const inputClass = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-xl border bg-white px-3 text-sm text-ink-900 outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-border focus:border-brand-500 focus:ring-brand-100"
  );

export function BsaCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [sex, setSex] = useState<Sex>("male");

  const [weightKgInput, setWeightKgInput] = useState("70");
  const [heightCmInput, setHeightCmInput] = useState("170");

  const [weightLbInput, setWeightLbInput] = useState("154");
  const [heightFtInput, setHeightFtInput] = useState("5");
  const [heightInInput, setHeightInInput] = useState("7");

  const [errors, setErrors] = useState<FormErrors>({});
  const [results, setResults] = useState<BsaResult[] | null>(null);

  function resolveWeightKg(): number | null {
    const raw = unit === "metric" ? weightKgInput : weightLbInput;
    const v = parseFloat(raw);
    if (!Number.isFinite(v)) return null;
    return unit === "metric" ? v : lbToKg(v);
  }

  function resolveHeightCm(): number | null {
    if (unit === "metric") {
      const v = parseFloat(heightCmInput);
      return Number.isFinite(v) ? v : null;
    }
    if (heightFtInput.trim() === "" && heightInInput.trim() === "") return null;
    const ft = parseFloat(heightFtInput);
    const inches = parseFloat(heightInInput);
    const safeFt = Number.isFinite(ft) ? ft : 0;
    const safeIn = Number.isFinite(inches) ? inches : 0;
    return inToCm(safeFt * 12 + safeIn);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const weightKg = resolveWeightKg();
    const heightCm = resolveHeightCm();
    const nextErrors: FormErrors = {};

    if (weightKg === null) {
      nextErrors.weight = "Enter a weight.";
    } else if (weightKg <= MIN_WEIGHT_KG || weightKg >= MAX_WEIGHT_KG) {
      nextErrors.weight =
        unit === "metric"
          ? "Enter a weight between 0 and 500 kg."
          : "Enter a weight between 0 and 1102 lb.";
    }

    if (heightCm === null) {
      nextErrors.height = "Enter a height.";
    } else if (heightCm <= MIN_HEIGHT_CM || heightCm >= MAX_HEIGHT_CM) {
      nextErrors.height =
        unit === "metric"
          ? "Enter a height between 0 and 300 cm."
          : "Enter a height between 0 and 9 ft 10 in.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || weightKg === null || heightCm === null) {
      setResults(null);
      return;
    }

    setResults(
      BSA_FORMULAS.map((f) => ({
        key: f.key,
        label: f.label,
        note: f.note,
        value: f.compute(weightKg, heightCm),
      }))
    );
  }

  const mostellerResult = results?.find((r) => r.key === "mosteller");
  const duboisResult = results?.find((r) => r.key === "dubois");
  const schlichKey = sex === "male" ? "schlich-male" : "schlich-female";

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_1px_0_0_rgba(11,14,23,0.03)] sm:p-8">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            Enter your measurements
          </h2>
          <div
            role="group"
            aria-label="Unit system"
            className="inline-flex rounded-full border border-border bg-muted p-1"
          >
            {(["metric", "imperial"] as Unit[]).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  unit === u
                    ? "bg-white text-ink-900 shadow-sm"
                    : "text-ink-500 hover:text-ink-900"
                )}
              >
                {u === "metric" ? "Metric (kg / cm)" : "Imperial (lb / ft-in)"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bsa-sex" className="text-sm font-medium text-ink-700">
              Sex{" "}
              <span className="font-normal text-ink-400">
                (used only for the Schlich formula)
              </span>
            </label>
            <select
              id="bsa-sex"
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="hidden sm:block" aria-hidden="true" />

          {unit === "metric" ? (
            <>
              <div>
                <label htmlFor="bsa-weight-kg" className="text-sm font-medium text-ink-700">
                  Weight (kg)
                </label>
                <input
                  id="bsa-weight-kg"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={weightKgInput}
                  onChange={(e) => setWeightKgInput(e.target.value)}
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? "bsa-weight-error" : undefined}
                  className={inputClass(!!errors.weight)}
                />
                {errors.weight && (
                  <p
                    id="bsa-weight-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                  >
                    <AlertCircle className="size-3.5" /> {errors.weight}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bsa-height-cm" className="text-sm font-medium text-ink-700">
                  Height (cm)
                </label>
                <input
                  id="bsa-height-cm"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={heightCmInput}
                  onChange={(e) => setHeightCmInput(e.target.value)}
                  aria-invalid={!!errors.height}
                  aria-describedby={errors.height ? "bsa-height-error" : undefined}
                  className={inputClass(!!errors.height)}
                />
                {errors.height && (
                  <p
                    id="bsa-height-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                  >
                    <AlertCircle className="size-3.5" /> {errors.height}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="bsa-weight-lb" className="text-sm font-medium text-ink-700">
                  Weight (lb)
                </label>
                <input
                  id="bsa-weight-lb"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={weightLbInput}
                  onChange={(e) => setWeightLbInput(e.target.value)}
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? "bsa-weight-error" : undefined}
                  className={inputClass(!!errors.weight)}
                />
                {errors.weight && (
                  <p
                    id="bsa-weight-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                  >
                    <AlertCircle className="size-3.5" /> {errors.weight}
                  </p>
                )}
              </div>

              <fieldset className="m-0 border-0 p-0">
                <legend className="text-sm font-medium text-ink-700">Height (ft, in)</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="bsa-height-ft" className="sr-only">
                      Height (feet)
                    </label>
                    <input
                      id="bsa-height-ft"
                      type="number"
                      inputMode="decimal"
                      step="1"
                      placeholder="ft"
                      value={heightFtInput}
                      onChange={(e) => setHeightFtInput(e.target.value)}
                      aria-invalid={!!errors.height}
                      aria-describedby={errors.height ? "bsa-height-error" : undefined}
                      className={inputClass(!!errors.height)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bsa-height-in" className="sr-only">
                      Height (inches)
                    </label>
                    <input
                      id="bsa-height-in"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      placeholder="in"
                      value={heightInInput}
                      onChange={(e) => setHeightInInput(e.target.value)}
                      aria-invalid={!!errors.height}
                      aria-describedby={errors.height ? "bsa-height-error" : undefined}
                      className={inputClass(!!errors.height)}
                    />
                  </div>
                </div>
                {errors.height && (
                  <p
                    id="bsa-height-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                  >
                    <AlertCircle className="size-3.5" /> {errors.height}
                  </p>
                )}
              </fieldset>
            </>
          )}
        </div>

        <button
          type="submit"
          className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700 sm:w-auto"
        >
          <Calculator className="size-4" />
          Calculate BSA
        </button>
      </form>

      <AnimatePresence>
        {results && mostellerResult && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
            className="mt-8 border-t border-border pt-8"
          >
            <div className="rounded-2xl bg-muted p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                Mosteller BSA (primary result)
              </p>
              <p className="font-display mt-2 text-4xl font-bold text-brand-600">
                {mostellerResult.value.toFixed(2)}&nbsp;m&sup2;
              </p>
              {duboisResult && (
                <p className="mt-2 text-sm text-ink-500">
                  Du Bois (historical/original standard):{" "}
                  {duboisResult.value.toFixed(2)}&nbsp;m&sup2;
                </p>
              )}
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Body surface area results from every formula
                </caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-400">
                    <th scope="col" className="py-2 pr-4 font-semibold">
                      Formula
                    </th>
                    <th scope="col" className="py-2 pr-4 font-semibold">
                      Result (m&sup2;)
                    </th>
                    <th scope="col" className="py-2 font-semibold">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr
                      key={r.key}
                      className={cn(
                        "border-b border-border/70 last:border-0",
                        r.key === schlichKey && "bg-brand-50/50"
                      )}
                    >
                      <td className="py-3 pr-4 font-medium text-ink-900">{r.label}</td>
                      <td className="py-3 pr-4 tabular-nums text-ink-700">
                        {r.value.toFixed(4)}
                      </td>
                      <td className="py-3 text-ink-500">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

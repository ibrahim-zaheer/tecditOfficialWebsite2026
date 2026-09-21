export type Sex = "male" | "female";
export type Unit = "metric" | "imperial";

export interface Circumferences {
  height: number;
  neck: number;
  waist: number;
  hip?: number;
}

export const CM_PER_IN = 2.54;

// Plausible human ranges per unit, used for input validation.
export const LIMITS: Record<
  Unit,
  Record<"height" | "neck" | "waist" | "hip", { min: number; max: number }>
> = {
  metric: {
    height: { min: 100, max: 250 },
    neck: { min: 20, max: 70 },
    waist: { min: 40, max: 250 },
    hip: { min: 50, max: 250 },
  },
  imperial: {
    height: { min: 40, max: 98 },
    neck: { min: 8, max: 28 },
    waist: { min: 16, max: 98 },
    hip: { min: 20, max: 98 },
  },
};

/**
 * Each unit system has its own formula with its own constants. Inputs must
 * already be in the unit system passed in (inches for "imperial", cm for
 * "metric"); never run one system's values through the other's formula.
 */
export function navyBodyFat(
  sex: Sex,
  unit: Unit,
  { height, neck, waist, hip = 0 }: Circumferences
): number {
  if (unit === "imperial") {
    return sex === "male"
      ? 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
      : 163.205 * Math.log10(waist + hip - neck) -
          97.684 * Math.log10(height) -
          78.387;
  }
  return sex === "male"
    ? 495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
        450
    : 495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(height)) -
        450;
}

export interface NavyStandardRow {
  label: string;
  minAge: number;
  maxAge: number;
  male: number;
  female: number;
}

export const NAVY_STANDARDS: NavyStandardRow[] = [
  { label: "18–21", minAge: 18, maxAge: 21, male: 22, female: 33 },
  { label: "22–29", minAge: 22, maxAge: 29, male: 23, female: 34 },
  { label: "30–39", minAge: 30, maxAge: 39, male: 24, female: 35 },
  { label: "40+", minAge: 40, maxAge: Infinity, male: 26, female: 36 },
];

export function getNavyStandard(
  age: number,
  sex: Sex
): { label: string; max: number } | null {
  const row = NAVY_STANDARDS.find((r) => age >= r.minAge && age <= r.maxAge);
  return row ? { label: row.label, max: row[sex] } : null;
}

export interface BodyFatCategory {
  label: string;
  male: string;
  female: string;
  // Exclusive upper bound of each category, in % body fat.
  maleBelow: number;
  femaleBelow: number;
}

export const BODY_FAT_CATEGORIES: BodyFatCategory[] = [
  { label: "Essential fat", male: "2–5%", female: "10–13%", maleBelow: 6, femaleBelow: 14 },
  { label: "Athletes", male: "6–13%", female: "14–20%", maleBelow: 14, femaleBelow: 21 },
  { label: "Fitness", male: "14–17%", female: "21–24%", maleBelow: 18, femaleBelow: 25 },
  { label: "Average", male: "18–24%", female: "25–31%", maleBelow: 25, femaleBelow: 32 },
  { label: "Obese", male: "25%+", female: "32%+", maleBelow: Infinity, femaleBelow: Infinity },
];

export function getBodyFatCategory(bodyFat: number, sex: Sex): string {
  const key = sex === "male" ? "maleBelow" : "femaleBelow";
  return (
    BODY_FAT_CATEGORIES.find((c) => bodyFat < c[key])?.label ?? "Obese"
  );
}

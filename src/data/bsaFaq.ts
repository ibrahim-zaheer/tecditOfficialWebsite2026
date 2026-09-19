export interface FaqItem {
  question: string;
  answer: string;
}

export const bsaFaqItems: FaqItem[] = [
  {
    question: "What is a normal BSA for an adult?",
    answer:
      "Average adult BSA is roughly 1.9 m² for men and 1.6 m² for women, though it varies with height and weight. There isn't a single \"normal\" value the way there is for BMI ranges — BSA is used as an input to other calculations (like drug dosing) rather than as a health score on its own.",
  },
  {
    question: "Which BSA formula is most accurate?",
    answer:
      "No single formula is universally \"most accurate\" — each was derived from a different measured population. Du Bois (1916) remains the historical reference standard and is still widely cited in research. Mosteller is the most commonly used in modern clinical practice because it is simpler to compute and produces results very close to Du Bois for most adults. Haycock is generally preferred for infants and children because it was validated specifically on pediatric data.",
  },
  {
    question: "How is BSA different from BMI?",
    answer:
      "BMI (Body Mass Index) uses weight and height to estimate body fat and screen for underweight/overweight categories. BSA estimates the total external surface area of the body and is used mainly to scale medical treatments — such as chemotherapy doses or cardiac output — to a person's size. They're calculated from the same two inputs but answer different clinical questions.",
  },
  {
    question: "Can I calculate BSA by hand?",
    answer:
      "Yes. The Mosteller formula is simple enough to do with a basic calculator: multiply weight in kg by height in cm, divide by 3600, then take the square root. The other formulas involve fractional exponents (like W^0.425), which are impractical without a scientific calculator — that's what this tool is for.",
  },
  {
    question: "Why do doctors use BSA for chemotherapy dosing?",
    answer:
      "BSA correlates more closely with metabolic rate, blood volume, and cardiac output than body weight alone does, which made it an appealing way to scale chemotherapy doses across patients of different sizes. It has been standard practice since the 1950s. That said, it's a debated method for some narrow-therapeutic-index drugs, since two patients with the same BSA can metabolize a drug very differently — dosing decisions are always made by a treating clinician, not by this or any online calculator.",
  },
  {
    question: "Does BSA calculation differ for children versus adults?",
    answer:
      "The underlying formulas are the same power equations, but some (like Haycock) were specifically validated against pediatric measurements and are generally preferred for infants and young children. Average BSA also scales dramatically with age — a newborn's BSA (≈0.25 m²) is roughly a sixth of an adult's.",
  },
  {
    question: "What units does this BSA calculator use?",
    answer:
      "You can enter values in metric (kilograms and centimeters) or imperial (pounds and feet/inches) — toggle between them above the form. All formulas internally use kilograms and centimeters, so imperial inputs are converted automatically before the calculation runs.",
  },
];

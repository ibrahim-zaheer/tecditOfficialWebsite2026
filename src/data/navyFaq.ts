import type { FaqItem } from "@/data/bsaFaq";

export const navyFaqItems: FaqItem[] = [
  {
    question: "What is the Navy body fat formula?",
    answer:
      "It is a pair of equations, one for men and one for women, that estimate body fat percentage from height and tape-measure circumferences. Men use height, neck, and abdomen measurements; women also add hips. Both apply a base-10 logarithm to a combination of those measurements, and each comes in an inch version and a centimeter version. The equations were published by Hodgdon and Beckett at the Naval Health Research Center in 1984.",
  },
  {
    question: "How accurate is the Navy body fat calculator?",
    answer:
      "The commonly reported margin of error is roughly 3–4 percentage points compared with laboratory methods such as DEXA or underwater weighing. It tends to be less reliable for very muscular, very lean, or very high-body-fat people. Treat the result as an estimate, and use exactly the same measuring technique each time if you are tracking change.",
  },
  {
    question: "What is the maximum body fat percentage allowed in the Navy?",
    answer:
      "Under the standards shown on this page, the maximum is 22% for men and 33% for women at ages 18–21, rising to 26% for men and 36% for women at age 40 and over. The full age table is above. Standards can be revised, so confirm against current official Navy guidance if the result matters for your service.",
  },
  {
    question: "How do I measure my waist and neck correctly?",
    answer:
      "Use a flexible, non-stretch tape on bare skin. Measure the neck just below the larynx, the abdomen (men) level with the navel or the waist (women) at its narrowest point, and the hips (women) at their widest point. Keep the tape level and snug without pressing into the skin, measure at the end of a normal exhale, and take each measurement three times and average them.",
  },
  {
    question: "Is the Navy method different for men and women?",
    answer:
      "Yes. Body fat is distributed differently on average in men and women, so the women's equation adds a hip measurement and uses its own constants. The measurement sites also differ slightly: men measure the abdomen at the navel, while women measure the waist at its narrowest point.",
  },
  {
    question: "Does the Navy method work for muscular or very lean people?",
    answer:
      "It can be less reliable. The method infers body fat from your waist size relative to your neck and height, so a very thick neck built from muscle, or a waist that is large for reasons other than fat, can skew the estimate. If precision matters, a DEXA scan or an assessment by a qualified professional is a better option.",
  },
  {
    question: "Should I use inches or centimeters?",
    answer:
      "Either. Choose whichever unit you measured in. The calculator uses the inch formula for inches and the centimeter formula for centimeters. The two versions have different constants, so the same measurements can give results a few tenths of a percentage point apart.",
  },
];

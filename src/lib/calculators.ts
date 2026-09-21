export interface HealthScoreInput {
  weight?: number | null;
  height?: number | null; // cm
  bodyFat?: number | null;
  visceralFat?: number | null;
  muscleMass?: number | null;
  gender?: 'MALE' | 'FEMALE';
  age?: number;
}

export interface HealthScoreResult {
  score: number;
  factors: string[];
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function calculateHealthScoreDetailed(input: HealthScoreInput): HealthScoreResult {
  let score = 100;
  const factors: string[] = [];

  // BMI Check
  if (input.weight && input.height) {
    const bmi = calculateBMI(input.weight, input.height);
    if (bmi >= 18.5 && bmi < 25) {
      factors.push("Healthy BMI (18.5 - 24.9).");
    } else if (bmi < 18.5) {
      score -= 10;
      factors.push("Underweight BMI (< 18.5) reduces score.");
    } else if (bmi >= 25 && bmi < 30) {
      score -= 10;
      factors.push("Overweight BMI (25 - 29.9) reduces score.");
    } else if (bmi >= 30) {
      score -= 20;
      factors.push("Obese BMI (30+) significantly reduces score.");
    }
  } else {
      factors.push("Missing height/weight data limits score accuracy.");
  }

  // Visceral Fat Check
  if (input.visceralFat != null) {
    if (input.visceralFat < 10) {
      factors.push("Healthy visceral fat levels (< 10).");
    } else if (input.visceralFat >= 10 && input.visceralFat < 15) {
      score -= 10;
      factors.push("High visceral fat (10 - 14.9) reduces score.");
    } else if (input.visceralFat >= 15) {
      score -= 20;
      factors.push("Very high visceral fat (15+) significantly reduces score.");
    }
  }

  // Body Fat Check
  if (input.bodyFat != null) {
    const bf = input.bodyFat;
    // Assuming gender-neutral rough ranges if gender not provided, but adjusting if it is
    if (input.gender === 'FEMALE') {
       if (bf > 32) { score -= 15; factors.push("High body fat percentage (> 32%) reduces score."); }
       else if (bf < 20) { score -= 5; factors.push("Low body fat percentage (< 20%) reduces score."); }
       else { factors.push("Healthy body fat percentage."); }
    } else if (input.gender === 'MALE') {
       if (bf > 25) { score -= 15; factors.push("High body fat percentage (> 25%) reduces score."); }
       else if (bf < 8) { score -= 5; factors.push("Low body fat percentage (< 8%) reduces score."); }
       else { factors.push("Healthy body fat percentage."); }
    } else {
       // Gender unknown, use a lenient average
       if (bf > 30) { score -= 15; factors.push("High body fat percentage reduces score."); }
       else if (bf < 10) { score -= 5; factors.push("Low body fat percentage reduces score."); }
    }
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    factors
  };
}

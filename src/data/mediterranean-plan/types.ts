export interface MediterraneanMeal {
  name: string;
  description: string;
  ingredients?: {
    name: string;
    amount: string;
    unit: string;
    notes?: string;
  }[];
  instructions?: string[];
  servingNote?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
}

export interface MediterraneanDayPlan {
  breakfast: MediterraneanMeal;
  morningSnack: MediterraneanMeal;
  lunch: MediterraneanMeal;
  afternoonSnack: MediterraneanMeal;
  dinner: MediterraneanMeal;
}

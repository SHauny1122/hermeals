export interface MediterraneanMeal {
  name: string;
  description: string;
  ingredients?: {
    name: string;
    amount: string;
    unit?: string;
    notes?: string;
  }[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  gremolata?: {
    name: string;
    amount: string;
    unit: string;
    notes: string;
  }[];
  servingNotes?: string;
}

export interface MediterraneanDayPlan {
  breakfast: MediterraneanMeal;
  morningSnack: MediterraneanMeal;
  lunch: MediterraneanMeal;
  afternoonSnack: MediterraneanMeal;
  dinner: MediterraneanMeal;
}

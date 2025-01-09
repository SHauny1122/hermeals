import { mediterraneanDayOne } from './day1';
import { MediterraneanDayPlan } from './types';

// Day 3 uses the same meals as Day 1
export const mediterraneanDayThree: MediterraneanDayPlan = {
  breakfast: mediterraneanDayOne.breakfast,
  morningSnack: mediterraneanDayOne.morningSnack,
  lunch: mediterraneanDayOne.lunch,
  afternoonSnack: mediterraneanDayOne.afternoonSnack,
  dinner: mediterraneanDayOne.dinner
};

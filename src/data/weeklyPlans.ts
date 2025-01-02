interface DayPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
}

type WeekData = {
  [key: string]: DayPlan;  // Monday, Tuesday, etc.
}

export const weeklyPlans = {
  week1: {
    Monday: {
      breakfast: "Raspberry Lime",
      lunch: "Easy Meat Roll Up",
      dinner: "Paleo Fajitas"
    },
    Tuesday: {
      breakfast: "Carrot Cake",
      lunch: "Tuna Artichoke Wraps",
      dinner: "Chicken Cacciatore"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "10-Minute Chicken Soup",
      dinner: "Easy Roasted Herb Chicken"
    },
    Thursday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Chopped Salad",
      dinner: "Slow Cooker Coconut Salmon"
    },
    Friday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Roll Your Own Salad",
      dinner: "Turkey Chili"
    },
    Saturday: {
      breakfast: "Greens and Leaks Omelet",
      lunch: "Salad Niçoise",
      dinner: "Grilled Lamb Chops"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Chicken Mesclun Salad",
      dinner: "Slow Cooker Pork Loin with Mustard and Rosemary"
    }
  } as WeekData,
  week2: {
    Monday: {
      breakfast: "Black Forest Cherry",
      lunch: "California Salad",
      dinner: "Rainbow Stuffed Peppers"
    },
    Tuesday: {
      breakfast: "Coconut Chai",
      lunch: "Shrimp Wraps",
      dinner: "Savory Steak with Mushrooms"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Southwest Steak Salad",
      dinner: "Grilled Chicken Breasts in Tomato Sauce"
    },
    Thursday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Salmon Burger",
      dinner: "Mini Meatball Minestrone Soup"
    },
    Friday: {
      breakfast: "Choco-Nutter",
      lunch: "Roll Your Own Salad",
      dinner: "Quick Indian Turkey Burger Salad"
    },
    Saturday: {
      breakfast: "Breakfast Stack",
      lunch: "Tahini Chicken Salad",
      dinner: "Slow-Cooker Shrimp Diavolo"
    },
    Sunday: {
      breakfast: "Raspberry Lime",
      lunch: "Mediterranean Lunch Wrap",
      dinner: "Herbed Lamb Kebabs with Grilled Zucchini"
    }
  } as WeekData,
  week3: {
    Monday: {
      breakfast: "Mint Chocolate Crunch",
      lunch: "Roast Beef Wraps",
      dinner: "Chicken Marsala"
    },
    Tuesday: {
      breakfast: "Blueberry Eye-Opener",
      lunch: "Pesto Chicken Salad",
      dinner: "Flavorful Flank Steak"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Italian Sweet-Veggie Scramble",
      dinner: "Sole Filet Over Greens"
    },
    Thursday: {
      breakfast: "Chocolate Raspberry",
      lunch: "Southwest Steak Salad",
      dinner: "Almond Butter Chicken"
    },
    Friday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Roll Your Own Salad",
      dinner: "Mouthwatering Meatloaf"
    },
    Saturday: {
      breakfast: "Poached Eggs and Turkey Sausage",
      lunch: "Herbed Frittata",
      dinner: "Dijon Salmon Steaks"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Salmon Wraps",
      dinner: "Baked Pesto Chicken"
    }
  } as WeekData,
  week4: {
    Monday: {
      breakfast: "Raspberry Lime",
      lunch: "Easy Meat Roll Up",
      dinner: "Paleo Fajitas"
    },
    Tuesday: {
      breakfast: "Carrot Cake",
      lunch: "Tuna Artichoke Wraps",
      dinner: "Chicken Cacciatore"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "10-Minute Chicken Soup",
      dinner: "Easy Roasted Herb Chicken"
    },
    Thursday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Chopped Salad",
      dinner: "Slow Cooker Coconut Salmon"
    },
    Friday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Roll Your Own Salad",
      dinner: "Turkey Chili"
    },
    Saturday: {
      breakfast: "Greens and Leaks Omelet",
      lunch: "Salad Niçoise",
      dinner: "Grilled Lamb Chops"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Chicken Mesclun Salad",
      dinner: "Slow Cooker Pork Loin with Mustard and Rosemary"
    }
  } as WeekData,
  week5: {
    Monday: {
      breakfast: "Black Forest Cherry",
      lunch: "California Salad",
      dinner: "Rainbow Stuffed Peppers"
    },
    Tuesday: {
      breakfast: "Coconut Chai",
      lunch: "Shrimp Wraps",
      dinner: "Savory Steak with Mushrooms"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Southwest Steak Salad",
      dinner: "Grilled Chicken Breasts in Tomato Sauce"
    },
    Thursday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Salmon Burger",
      dinner: "Mini Meatball Minestrone Soup"
    },
    Friday: {
      breakfast: "Choco-Nutter",
      lunch: "Roll Your Own Salad",
      dinner: "Quick Indian Turkey Burger Salad"
    },
    Saturday: {
      breakfast: "Breakfast Stack",
      lunch: "Tahini Chicken Salad",
      dinner: "Slow-Cooker Shrimp Diavolo"
    },
    Sunday: {
      breakfast: "Raspberry Lime",
      lunch: "Mediterranean Lunch Wrap",
      dinner: "Herbed Lamb Kebabs with Grilled Zucchini"
    }
  } as WeekData,
  week6: {
    Monday: {
      breakfast: "Mint Chocolate Crunch",
      lunch: "Roast Beef Wraps",
      dinner: "Chicken Marsala"
    },
    Tuesday: {
      breakfast: "Blueberry Eye-Opener",
      lunch: "Pesto Chicken Salad",
      dinner: "Flavorful Flank Steak"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Italian Sweet-Veggie Scramble",
      dinner: "Sole Filet Over Greens"
    },
    Thursday: {
      breakfast: "Chocolate Raspberry",
      lunch: "Southwest Steak Salad",
      dinner: "Almond Butter Chicken"
    },
    Friday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Roll Your Own Salad",
      dinner: "Mouthwatering Meatloaf"
    },
    Saturday: {
      breakfast: "Poached Eggs and Turkey Sausage",
      lunch: "Herbed Frittata",
      dinner: "Dijon Salmon Steaks"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Salmon Wraps",
      dinner: "Baked Pesto Chicken"
    }
  } as WeekData,
  week7: {
    Monday: {
      breakfast: "Raspberry Lime",
      lunch: "Easy Meat Roll Up",
      dinner: "Paleo Fajitas"
    },
    Tuesday: {
      breakfast: "Carrot Cake",
      lunch: "Tuna Artichoke Wraps",
      dinner: "Chicken Cacciatore"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "10-Minute Chicken Soup",
      dinner: "Easy Roasted Herb Chicken"
    },
    Thursday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Chopped Salad",
      dinner: "Slow Cooker Coconut Salmon"
    },
    Friday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Roll Your Own Salad",
      dinner: "Turkey Chili"
    },
    Saturday: {
      breakfast: "Greens and Leaks Omelet",
      lunch: "Salad Niçoise",
      dinner: "Grilled Lamb Chops"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Chicken Mesclun Salad",
      dinner: "Slow Cooker Pork Loin with Mustard and Rosemary"
    }
  } as WeekData,
  week8: {
    Monday: {
      breakfast: "Black Forest Cherry",
      lunch: "California Salad",
      dinner: "Rainbow Stuffed Peppers"
    },
    Tuesday: {
      breakfast: "Coconut Chai",
      lunch: "Shrimp Wraps",
      dinner: "Savory Steak with Mushrooms"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Southwest Steak Salad",
      dinner: "Grilled Chicken Breasts in Tomato Sauce"
    },
    Thursday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Salmon Burger",
      dinner: "Mini Meatball Minestrone Soup"
    },
    Friday: {
      breakfast: "Choco-Nutter",
      lunch: "Roll Your Own Salad",
      dinner: "Quick Indian Turkey Burger Salad"
    },
    Saturday: {
      breakfast: "Breakfast Stack",
      lunch: "Tahini Chicken Salad",
      dinner: "Slow-Cooker Shrimp Diavolo"
    },
    Sunday: {
      breakfast: "Raspberry Lime",
      lunch: "Mediterranean Lunch Wrap",
      dinner: "Herbed Lamb Kebabs with Grilled Zucchini"
    }
  } as WeekData,
  week9: {
    Monday: {
      breakfast: "Mint Chocolate Crunch",
      lunch: "Roast Beef Wraps",
      dinner: "Chicken Marsala"
    },
    Tuesday: {
      breakfast: "Blueberry Eye-Opener",
      lunch: "Pesto Chicken Salad",
      dinner: "Flavorful Flank Steak"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Italian Sweet-Veggie Scramble",
      dinner: "Sole Filet Over Greens"
    },
    Thursday: {
      breakfast: "Chocolate Raspberry",
      lunch: "Southwest Steak Salad",
      dinner: "Almond Butter Chicken"
    },
    Friday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Roll Your Own Salad",
      dinner: "Mouthwatering Meatloaf"
    },
    Saturday: {
      breakfast: "Poached Eggs and Turkey Sausage",
      lunch: "Herbed Frittata",
      dinner: "Dijon Salmon Steaks"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Salmon Wraps",
      dinner: "Baked Pesto Chicken"
    }
  } as WeekData,
  week10: {
    Monday: {
      breakfast: "Raspberry Lime",
      lunch: "Easy Meat Roll Up",
      dinner: "Paleo Fajitas"
    },
    Tuesday: {
      breakfast: "Carrot Cake",
      lunch: "Tuna Artichoke Wraps",
      dinner: "Chicken Cacciatore"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "10-Minute Chicken Soup",
      dinner: "Easy Roasted Herb Chicken"
    },
    Thursday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Chopped Salad",
      dinner: "Slow Cooker Coconut Salmon"
    },
    Friday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Roll Your Own Salad",
      dinner: "Turkey Chili"
    },
    Saturday: {
      breakfast: "Greens and Leaks Omelet",
      lunch: "Salad Niçoise",
      dinner: "Grilled Lamb Chops"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Chicken Mesclun Salad",
      dinner: "Slow Cooker Pork Loin with Mustard and Rosemary"
    }
  } as WeekData,
  week11: {
    Monday: {
      breakfast: "Black Forest Cherry",
      lunch: "California Salad",
      dinner: "Rainbow Stuffed Peppers"
    },
    Tuesday: {
      breakfast: "Coconut Chai",
      lunch: "Shrimp Wraps",
      dinner: "Savory Steak with Mushrooms"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Southwest Steak Salad",
      dinner: "Grilled Chicken Breasts in Tomato Sauce"
    },
    Thursday: {
      breakfast: "Salted Dark Chocolate",
      lunch: "Salmon Burger",
      dinner: "Mini Meatball Minestrone Soup"
    },
    Friday: {
      breakfast: "Choco-Nutter",
      lunch: "Roll Your Own Salad",
      dinner: "Quick Indian Turkey Burger Salad"
    },
    Saturday: {
      breakfast: "Breakfast Stack",
      lunch: "Tahini Chicken Salad",
      dinner: "Slow-Cooker Shrimp Diavolo"
    },
    Sunday: {
      breakfast: "Raspberry Lime",
      lunch: "Mediterranean Lunch Wrap",
      dinner: "Herbed Lamb Kebabs with Grilled Zucchini"
    }
  } as WeekData,
  week12: {
    Monday: {
      breakfast: "Mint Chocolate Crunch",
      lunch: "Roast Beef Wraps",
      dinner: "Chicken Marsala"
    },
    Tuesday: {
      breakfast: "Blueberry Eye-Opener",
      lunch: "Pesto Chicken Salad",
      dinner: "Flavorful Flank Steak"
    },
    Wednesday: {
      breakfast: "Roll Your Own",
      lunch: "Italian Sweet-Veggie Scramble",
      dinner: "Sole Filet Over Greens"
    },
    Thursday: {
      breakfast: "Chocolate Raspberry",
      lunch: "Southwest Steak Salad",
      dinner: "Almond Butter Chicken"
    },
    Friday: {
      breakfast: "Peachy Nutmeg",
      lunch: "Roll Your Own Salad",
      dinner: "Mouthwatering Meatloaf"
    },
    Saturday: {
      breakfast: "Poached Eggs and Turkey Sausage",
      lunch: "Herbed Frittata",
      dinner: "Dijon Salmon Steaks"
    },
    Sunday: {
      breakfast: "Roll Your Own",
      lunch: "Salmon Wraps",
      dinner: "Baked Pesto Chicken"
    }
  } as WeekData
} as const;
import { RecordCategory } from "@prisma/client";

export const formatValueText = (category: RecordCategory, value: number) => {
  switch (category) {
    case "steps":
      return `${value.toLocaleString()}걸음`;
    case "sleep":
      return `${value.toFixed(0)}시간`;
    case "mood":
      return `${value.toFixed(0)}점`;
    case "panic":
      return `${value}회`;
  }
};

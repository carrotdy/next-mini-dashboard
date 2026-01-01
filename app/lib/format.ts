import type { HealthRecord } from "@/app/lib/records";

export const formatRecordValueText = (value: HealthRecord) => {
  switch (value.category) {
    case "steps":
      return `${value.value.toLocaleString()}걸음`;
    case "sleep":
      return `${value.value.toFixed(0)}시간`;
    case "mood":
      return `${value.value.toFixed(0)}점`;
    case "panic":
      return `${value.value}회`;
  }
};

import { ref } from "vue";
import en from "@/lang/en.json";

export default function () {
  const l = ref("PL");

  const t = (text) => {
    if (l.value !== "PL") {
      return en[text];
    }

    return text;
  };

  const change = (lang) => (l.value = lang);

  return {
    l,
    t,
    change,
  };
}

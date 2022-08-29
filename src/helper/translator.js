import { ref } from "vue";
import en from "@/lang/en.json";

export default function (lang) {
  const l = ref(lang);

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

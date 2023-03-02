import { vidgetElems } from "./elements.js";

export function validation(forms, regularE) {
  let formsValues = Object.values(regularE);
  for (let i = 0; i < forms.length; i++) {
    if (formsValues[i].regexp.test(forms[i].value)) {
      forms[i].classList.remove("form__input--invalid");
      formsValues[i].valid = true;
    } else {
      formsValues[i].valid = false;
      forms[i].value = "";
      forms[i].classList.add("form__input--invalid");
    }
  }
}

export function validatePickPlan(radioCls) {
  for (let i = 0; i < radioCls.length; i++) {
    if (radioCls[i].checked) {
      return true;
    }
  }
  vidgetElems("Choose at least one option!");
}

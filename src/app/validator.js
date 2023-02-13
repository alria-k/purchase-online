export function validation(forms, fields) {
  let formsValues = Object.values(fields);
  for (let i = 0; i < forms.length; i++) {
    if (formsValues[i].regexp.test(forms[i].value)) {
      forms[i].classList.remove("form__input--invalid");
      formsValues[i].valid = true;
    } else {
      forms[i].value = "";
      forms[i].classList.add("form__input--invalid");
    }
  }
}

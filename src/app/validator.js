export function validation(forms, fields) {
  let formsValues = Object.values(fields);
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

export function fillData(e) {
  let lol = document.querySelector(e);
  console.log(lol);
}

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

export function fillData(e, obj, data, nameVal, priceVal) {
  document.querySelectorAll(e).forEach((elem, index) => {
    elem.addEventListener("click", (event) => {
      let targetAttribute = event.target.getAttribute("type");
      switch (Object.values(event.target.dataset) == data && targetAttribute) {
        case "radio":
          obj.value = {
            name: nameVal,
            price: priceVal,
          };
          break;
        case "checkbox":
          obj[index] = {
            name: nameVal,
            price: priceVal,
          };
          break;
      }
    });
  });
}

import { addsElems, planElems, formElems } from "./elements.js";
import { validation } from "./validator.js";

const sectionInner = document.querySelector(".section__inner");
export class StepsLogic {
  constructor(steps, forms) {
    this.steps = steps;
    this.forms = forms;
    this.stepsCount = 0;
    this.yearlyRent = false;
    this.fieldsData = {
      text: {
        regexp: /^(?!\s*$).+/,
        valid: false,
      },
      email: {
        regexp: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        valid: false,
      },
      tel: {
        regexp: /^\+?[1-9][0-9]{7,14}$/,
        valid: false,
      },
    };
    this.elemsCreateObject = {
      form: {
        func: formElems,
        params: "",
      },
      plan: {
        func: planElems,
        params: "./src/data/plan.json",
      },
      adds: {
        func: addsElems,
        params: "./src/data/adds.json",
      },
    };

    this.validateContent = this.validateContent.bind(this);
    this.checkAndChangeSteps = this.checkAndChangeSteps.bind(this);

    this.checkAndChangeSteps();
    this.validateContent();
  }
  validateContent() {
    this.btn = [...document.getElementsByClassName("next-step__btn")];
    this.btn.forEach((elem) => {
      elem.addEventListener("click", (event) => {});
    });
  }
  checkAndChangeSteps() {
    Object.values(this.elemsCreateObject).forEach((value, index) => {
      this.steps[index].classList.remove("steps__item--active");
      if (this.stepsCount == index) {
        value.func(value.params, this.yearlyRent);
        this.steps[index].classList.add("steps__item--active");
      } else {
        sectionInner.firstChild.remove();
      }
    });
  }
  checkYearlyBill() {
    this.billCheckBox = document.querySelector(".payrent-checkbox");
  }
}

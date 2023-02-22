import { addsElems, planElems, formElems } from "./elements.js";
import { validation, fillData } from "./validator.js";

const sectionInner = document.querySelector(".section__inner");
export class StepsLogic {
  constructor(steps, forms) {
    this.steps = steps;
    this.forms = forms;
    this.stepsCount = 1;
    this.key;
    this.fieldsData = {
      text: {
        valid: false,
        regexp: /^(?!\s*$).+/,
      },
      email: {
        valid: false,
        regexp: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      },
      tel: {
        valid: false,
        regexp: /^\+?[1-9][0-9]{7,14}$/,
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
    this.checkValid = this.checkValid.bind(this);

    this.checkAndChangeSteps();
    this.validateContent();
  }
  validateContent() {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("next-step__btn")) {
        if (this.checkValid()) {
          this.stepsCount++;
          this.checkAndChangeSteps();
        }
      }
      if (event.target.classList.contains("back-step__btn")) {
        this.stepsCount--;
        this.checkAndChangeSteps();
      }
      if (event.target.classList.contains("plan-radio")) {
      }
    });
  }
  checkAndChangeSteps() {
    Object.values(this.elemsCreateObject).forEach((value, index) => {
      this.steps[index].classList.remove("steps__item--active");
      if (this.stepsCount == index) {
        value.func(value.params);
        this.steps[index].classList.add("steps__item--active");
      }
      if (sectionInner.children.length > 1) {
        sectionInner.removeChild(this.forms[0]);
      }
    });
  }
  checkValid() {
    validation(document.querySelectorAll(".form__input"), this.fieldsData);
    let key = [];
    for (let keys in this.fieldsData) {
      if (this.fieldsData[keys].valid == true) {
        key.push(this.fieldsData[keys].valid);
      }
    }
    if (key.length == 3) return true;
  }
}

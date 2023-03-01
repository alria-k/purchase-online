import { addsElems, planElems, formElems, totalElems } from "./elements.js";
import { validation } from "./validator.js";

const sectionInner = document.querySelector(".section__inner");
export class StepsLogic {
  constructor(steps, forms) {
    this.steps = steps;
    this.forms = forms;
    this.stepsCount = 0;
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
      total: {
        func: totalElems,
        params: "",
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
          this.checkAndChangeSteps(
            "form__animation--forward",
            "form__animation--backwards"
          );
        }
      }
      if (event.target.classList.contains("back-step__btn")) {
        this.stepsCount--;
        this.checkAndChangeSteps(
          "form__animation--from-back-to-forward",
          "form__animation--from-forward-to-back"
        );
      }
    });
  }
  checkAndChangeSteps(firstCls, secondCls) {
    Object.values(this.elemsCreateObject).forEach(async (value, index) => {
      this.steps[index].classList.remove("steps__item--active");
      if (this.stepsCount == index) {
        await value.func(value.params);
        this.steps[index].classList.add("steps__item--active");
        this.forms[0].classList.remove(firstCls);
      }
      if (sectionInner.children.length > 1) {
        this.forms[0].classList.add(secondCls);
        this.forms[1].classList.add(firstCls);
      }
    });
    setTimeout(() => {
      if (sectionInner.children.length != 1) {
        sectionInner.removeChild(this.forms[0]);
        this.forms[0].classList.remove(firstCls);
      }
    }, 600);
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

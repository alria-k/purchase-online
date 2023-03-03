import {
  addsElems,
  planElems,
  formElems,
  totalElems,
  fillData,
} from "./elements.js";
import { validation, validatePickPlan } from "./validator.js";

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
    this.validationArray = [
      this.checkValidForms,
      this.checkValidRadio,
      this.checkValidCheckBox,
    ];

    this.validateContent = this.validateContent.bind(this);
    this.checkAndChangeSteps = this.checkAndChangeSteps.bind(this);
    this.checkValidForms = this.checkValidForms.bind(this);
    this.checkValidRadio = this.checkValidRadio.bind(this);
    this.checkValidCheckBox = this.checkValidCheckBox.bind(this);

    this.checkAndChangeSteps();
    this.validateContent();
  }
  validateContent() {
    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("next-step__btn")) {
        this.validationArray[this.stepsCount].apply(this);
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
  checkValidForms() {
    validation(document.querySelectorAll(".form__input"), this.fieldsData);
    let key = [];
    for (let keys in this.fieldsData) {
      if (this.fieldsData[keys].valid == true) {
        key.push(this.fieldsData[keys].valid);
      }
      if (key.length == 3) {
        this.fieldsData[keys].valid = false;
        this.stepsCount++;
        this.checkAndChangeSteps(
          "form__animation--forward",
          "form__animation--backwards"
        );
      }
    }
  }
  async checkValidRadio() {
    await fillData();
    if (validatePickPlan(document.querySelectorAll(".plan-radio"))) {
      this.stepsCount++;
      this.checkAndChangeSteps(
        "form__animation--forward",
        "form__animation--backwards"
      );
    }
  }
  async checkValidCheckBox() {
    await fillData();
    this.stepsCount++;
    this.checkAndChangeSteps(
      "form__animation--forward",
      "form__animation--backwards"
    );
  }
}

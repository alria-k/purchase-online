import { fillData } from "./validator.js";

const sectionInner = document.querySelector(".section__inner");
let yearlyRent = false;

export function formElems() {
  sectionInner.insertAdjacentHTML(
    "beforeend",
    `
      <div class="form__content first-step" data-stepCount="first">
                  <div class="form__text-box">
                    <h1 class="form-title">Personal info</h1>
                    <p class="form-description">
                      Please provide your name, email address, and phone number.
                    </p>
                  </div>
                  <form class="form__inner">
                    <label>Name</label>
                    <input
                      class="form__input"
                      type="text"
                      placeholder="e.g. Stephen King"
                    />
                    <label>Email Address</label>
                    <input
                      class="form__input"
                      type="email"
                      placeholder="e.g. stephenking@lorem.com"
                    />
                    <label>Phone Number</label>
                    <input
                      class="form__input"
                      type="tel"
                      placeholder="e.g. +1 234 567 890"
                    />
                  </form>
                  <div class="btn-box">
                    <input class="next-step__btn" type="submit" value="Next Step">
                  </div>
                </div>
      `
  );
}
export function planElems(jsonFile) {
  let stepContainer = document.createElement("div");
  stepContainer.className = "form__content second-step";
  stepContainer.dataset.stepCount = "second";
  sectionInner.append(stepContainer);
  stepContainer.insertAdjacentHTML(
    "beforeend",
    `
        <div class="form__text-box">
        <h1 class="form-title">Select your plan</h1>
        <p class="form-description">
          You have the option of monthly or yearly billing.
        </p>
      </div>
      <form>
        <ul class="plan__container"></ul>
        <div class="payrent__box">
          <p class="payrent-text mounthly">Mounthly</p>
          <div class="payrent-checkbox__box">
            <input
              class="payrent-checkbox"
              type="checkbox"
              name="payrent-checkbox"
              ${yearlyRent ? "checked" : ""}
            />
            <label
              class="payrent-checkbox__circle"
              for="payrent-checkbox"
            ></label>
          </div>
          <p class="payrent-text yearly">Yearly</p>
        </div>
      </form>
      <div class="btn-box">
        <input class="next-step__btn" type="submit" value="Next Step">
        <input class="back-step__btn" type="submit" value="Go Back">
      </div>`
  );
  let planItemContainer = document.getElementsByClassName("plan__container");
  let planItemContainerArray = Array.from(planItemContainer);
  fetch(jsonFile)
    .then((response) => response.json())
    .then((json) =>
      Object.entries(json).map((item) => {
        planItemContainerArray.forEach((elem) => {
          elem.insertAdjacentHTML(
            "beforeend",
            `
                <li class="plan__item">
                <input
                  class="plan-radio"
                  type="radio"
                  name="plan"
                  data-plan=${item[0]}
                />
                <div class="custom__radio">
                  <img
                    class="plan__img"
                    src=${item[1].img}
                    alt="arcade-img"
                  />
                  <div class="plan__item-text">
                    <h1 class="tarif__title">${item[1].planName}</h1>
                  </div>
                </div>
              </li>
                  `
          );
        });
        changingPrice(
          item[1].planMounthyPrice,
          item[1].planYearlyPrice,
          "plan__item-text"
        );
      })
    );
  document
    .querySelector(".payrent-checkbox")
    .addEventListener("click", (event) => {
      if (event.target.checked) {
        yearlyRent = true;
      } else {
        yearlyRent = false;
      }
    });
}
export function addsElems(jsonFile) {
  let stepContainer = document.createElement("div");
  stepContainer.className = "form__content third-step";
  stepContainer.dataset.stepCount = "third";
  sectionInner.append(stepContainer);
  stepContainer.insertAdjacentHTML(
    "beforeend",
    `
     <div class="form__text-box">
        <h1 class="form-title">Pick add-ons</h1>
          <p class="form-description">
            Add-ons help enhance your gaming experience.
          </p>
      </div>
        <form>
          <ul class="adds__item-box"></ul>
        </form>
        <div class="btn-box">
          <input class="next-step__btn" type="submit" value="Next Step">
          <input class="back-step__btn" type="submit" value="Go Back">
        </div>
        `
  );
  let addsItemContainer = document.getElementsByClassName("adds__item-box");
  let addsItemContainerArray = Array.from(addsItemContainer);
  fetch(jsonFile)
    .then((response) => response.json())
    .then((json) =>
      Object.entries(json).map((item) => {
        addsItemContainerArray.forEach((elem) => {
          elem.insertAdjacentHTML(
            "beforeend",
            `
              <li class="adds__item">
                <div class="adds-checkbox__container">
                  <input
                    class="adds-checkbox"
                    type="checkbox"
                    data-add=${item[0]}
                    name="adds-checkbox"
                  />
                  <label
                    class="adds-checkbox--custom"
                    for="adds-checkbox"
                  ></label>
                </div>
                <div class="adds__item-content">
                  <div class="adds__item-text">
                    <h1 class="tarif__title">${item[1].addsName}</h1>
                    <p class="tarif__description">
                      ${item[1].addsBenefits}
                    </p>
                  </div>
                  <div class="adds__item-price">
                  </div>
                </div>
              </li>
              `
          );
        });
        changingPrice(
          item[1].addsMounthlyPrice,
          item[1].addsYearlyPrice,
          "adds__item-price"
        );
      })
    );
}

// export function totalElems(array)

function changingPrice(mounthly, yearly, container) {
  let textContainer = Array.from(document.getElementsByClassName(container));
  let text = document.createElement("p");
  text.className = "tarif__description";
  textContainer.forEach((elem) => {
    elem.append(text);
    billingCheck(text, mounthly, yearly);
  });
}

function billingCheck(elem, priceM, priceY) {
  if (yearlyRent) {
    return (elem.innerText = `$${priceY}/yr`);
  } else {
    return (elem.innerText = `$${priceM}/mo`);
  }
}

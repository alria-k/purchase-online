const sectionInner = document.querySelector(".section__inner");
let yearlyRent = false;
let jsonData;
let finalStepObject = {
  plan: {},
  adds: {},
  total: {},
};

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
export async function planElems(jsonFile) {
  await getJsonData(jsonFile);
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
  for (let keys in jsonData) {
    planItemContainerArray.forEach((elem) => {
      elem.insertAdjacentHTML(
        "beforeend",
        `
            <li class="plan__item">
            <input
              class="plan-radio"
              type="radio"
              name="plan"
              data-plan=${keys}
            />
            <div class="custom__radio">
              <img
                class="plan__img"
                src=${jsonData[keys].img}
                alt="arcade-img"
              />
              <div class="plan__item-text">
                <h1 class="tarif__title">${jsonData[keys].planName}</h1>
                <p class="tarif__description money__component"></p>
              </div>
            </div>
          </li>
              `
      );
    });
  }
  changingPrice("plan__item-text", ".money__component");
  fillData("[type='radio']", finalStepObject.plan, jsonData);
  document
    .querySelector(".payrent-checkbox")
    .addEventListener("click", (event) => {
      if (event.target.checked) {
        yearlyRent = true;
        changingPrice("plan__item-text", ".money__component");
      } else {
        yearlyRent = false;
        changingPrice("plan__item-text", ".money__component");
      }
    });
}
export async function addsElems(jsonFile) {
  await getJsonData(jsonFile);
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
  for (let keys in jsonData) {
    addsItemContainerArray.forEach((elem) => {
      elem.insertAdjacentHTML(
        "beforeend",
        `
              <li class="adds__item">
                <div class="adds-checkbox__container">
                  <input
                    class="adds-checkbox"
                    type="checkbox"
                    data-add=${keys}
                    name="adds-checkbox"
                  />
                  <label
                    class="adds-checkbox--custom"
                    for="adds-checkbox"
                  ></label>
                </div>
                <div class="adds__item-content">
                  <div class="adds__item-text">
                    <h1 class="tarif__title">${jsonData[keys].addsName}</h1>
                    <p class="tarif__description">
                      ${jsonData[keys].addsBenefits}
                    </p>
                  </div>
                  <div class="adds__item-price">
                    <p class="tarif__description money__component"></p>
                  </div>
                </div>
              </li>
              `
      );
    });
  }
  changingPrice("adds__item-price", ".money__component");
  fillData(".adds-checkbox", finalStepObject.adds, jsonData);
}
export function totalElems() {
  totalData();
  let stepContainer = document.createElement("div");
  stepContainer.className = "form__content fourth-step";
  stepContainer.dataset.stepCount = "fourth";
  sectionInner.append(stepContainer);
  stepContainer.insertAdjacentHTML(
    "beforeend",
    `
  <div class="form__text-box">
                  <h1 class="form-title">Finishing up</h1>
                  <p class="form-description">
                    Double-check everything looks OK before confirming
                  </p>
                </div>
                <div class="total__box">
                  <div class="total__box-info">
                    <div class="total-plan__text">
                      <div class="plan__text-title">
                        <h4 class="tarif__title">${
                          yearlyRent
                            ? finalStepObject.plan.value.name + " (Yearly)"
                            : finalStepObject.plan.value.name + " (Mounthly)"
                        }</h4>
                        <button class="btn__change-plan">Change</button>
                      </div>
                      <p class="tarif__title">$${
                        yearlyRent
                          ? finalStepObject.plan.value.price + "/yr"
                          : finalStepObject.plan.value.price + "/mo"
                      }</p>
                    </div>
                    <div class="total-adds__text">
                    </div>
                  </div>
                  <div class="total__box-price">
                    <p class="tarif__description">Total ${
                      yearlyRent ? "(per year)" : "(per month)"
                    }</p>
                    <p class="total-price__text">+$${
                      yearlyRent
                        ? finalStepObject.total + "/yr"
                        : finalStepObject.total + "/mo"
                    }</p>
                  </div>
                </div>
                <div class="btn-box">
                  <input class="next-step__btn" type="submit" value="Confirm" />
                  <input class="back-step__btn" type="submit" value="Go Back" />
                </div>
              </div>
  `
  );
  let addsText = Array.from(
    document.getElementsByClassName("total-adds__text")
  );
  addsText.forEach((elem) => {
    for (let keys in finalStepObject.adds) {
      elem.insertAdjacentHTML(
        "beforeend",
        `
      <div class="adds__text-box">
        <p class="tarif__description">${finalStepObject.adds[keys].name}</p>
        <p class="tarif__price">+$${
          yearlyRent
            ? finalStepObject.adds[keys].price + "/yr"
            : finalStepObject.adds[keys].price + "/mo"
        }</p>
      </div>
      `
      );
    }
  });
}

function totalData() {
  let obj = finalStepObject;
  let totalPrice = [];
  for (let keys in obj) {
    let getKeys = obj[keys];
    Object.values(getKeys).forEach((elem) => {
      totalPrice.push(elem.price);
    });
  }
  obj.total = totalPrice.reduce((a, b) => a + b);
}

function changingPrice(container, text) {
  let textContainer = Array.from(document.getElementsByClassName(container));
  textContainer.forEach((elem, index) => {
    let textElem = elem.querySelector(text);
    let extraMounth = document.createElement("p");
    extraMounth.className = "tarif__description extra-month";
    if (yearlyRent) {
      return (textElem.innerText = `$${
        Object.values(jsonData)[index].yearlyPrice
      }/yr`);
    } else {
      return (textElem.innerText = `$${
        Object.values(jsonData)[index].mounthlyPrice
      }/mo`);
    }
  });
}

function fillData(e, fillObj, jsonObj) {
  let objValues = Object.values(jsonObj);
  document.querySelectorAll(e).forEach((elem, index) => {
    elem.addEventListener("click", (event) => {
      let targetAttribute = event.target.getAttribute("type");
      let properPriceVal = yearlyRent
        ? objValues[index].yearlyPrice
        : objValues[index].mounthlyPrice;
      switch (targetAttribute) {
        case "radio":
          fillObj.value = {
            name: objValues[index].planName,
            price: properPriceVal,
          };
          break;
        case "checkbox":
          fillObj[index] = {
            name: objValues[index].addsName,
            price: properPriceVal,
          };
          break;
      }
      if (!event.target.checked) {
        delete fillObj[index];
      }
    });
  });
}

//help func

async function getJsonData(json) {
  let res = await fetch(json);
  jsonData = await res.json();
}
////////////////

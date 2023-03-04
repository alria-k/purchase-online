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
                    <input class="next-step__btn" type="button" value="Next Step">
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
        <ul class="plan__container options__box"></ul>
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
        <input class="next-step__btn" type="button" value="Next Step">
        <input class="back-step__btn" type="button" value="Go Back">
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
  extraMonthes(yearlyRent, document.querySelectorAll(".plan__item-text"));
  document
    .querySelector(".payrent-checkbox")
    .addEventListener("click", (event) => {
      if (event.target.checked) {
        yearlyRent = true;
      } else {
        yearlyRent = false;
      }
      changingPrice("plan__item-text", ".money__component");
      extraMonthes(yearlyRent, document.querySelectorAll(".plan__item-text"));
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
          <ul class="adds__item-box options__box"></ul>
        </form>
        <div class="btn-box">
          <input class="next-step__btn" type="button" value="Next Step">
          <input class="back-step__btn" type="button" value="Go Back">
        </div>
        `
  );
  let addsItemContainer = document.getElementsByClassName("adds__item-box");
  let addsItemContainerArray = Array.from(addsItemContainer);
  for (let keys in jsonData) {
    addsItemContainerArray.forEach((elem, index) => {
      elem.insertAdjacentHTML(
        "beforeend",
        `
              <li class="adds__item">
                <div class="adds-checkbox__container">
                  <input
                    class="adds-checkbox"
                    type="checkbox"
                    data-adds=${keys}
                    name="adds-checkbox"
                    ${
                      saveOptionCondition(
                        finalStepObject.adds,
                        jsonData[keys].id
                      )
                        ? "checked"
                        : ""
                    }
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
}
export function totalElems() {
  let stepContainer = document.createElement("div");
  stepContainer.className = "form__content fourth-step";
  stepContainer.dataset.stepCount = "fourth";
  sectionInner.append(stepContainer);
  totalData();
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
                    <div class="total-plan__text"></div>
                    <div class="total-adds__text"></div>
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
                  <input class="next-step__btn" type="button" value="Confirm" />
                  <input class="back-step__btn" type="button" value="Go Back" />
                </div>
              </div>
  `
  );
  let planText = Array.from(
    document.getElementsByClassName("total-plan__text")
  );
  planText.forEach((elem, index) => {
    for (let keys in finalStepObject.plan) {
      elem.insertAdjacentHTML(
        "beforeend",
        `
      <div class="plan__text-title">
          <h4 class="tarif__title">${
            yearlyRent
              ? finalStepObject.plan[keys].name + " (Yearly)"
              : finalStepObject.plan[keys].name + " (Mounthly)"
          }</h4>
        <button class="btn__change-plan">Change</button>
      </div>
        <p class="tarif__title">$${
          yearlyRent
            ? finalStepObject.plan[keys].price + "/yr"
            : finalStepObject.plan[keys].price + "/mo"
        }</p>
      `
      );
    }
  });
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
export function confirmElems() {
  sectionInner.insertAdjacentHTML(
    "beforeend",
    `
  <div class="form__content confirm__box">
  <img
    class="confirm__img"
    src="./src/images/icon-thank-you.svg"
    alt="thank-you"
  />
  <div class="confirm__text">
    <h1 class="confirm-title">Thank you!</h1>
    <p class="confirm-subtitle">
      Thanks for confirming your subscription! We hope you have fun using
      our platform. If you ever need support, please feel free to email us
      at support@loremgaming.com.
    </p>
  </div>
</div>
  `
  );
}
export function vidgetElems(variousText) {
  let main = document.querySelector("main");
  let vidgetBox = document.createElement("div");
  vidgetBox.className = "denied__box denied--open";
  vidgetBox.insertAdjacentHTML(
    `afterbegin`,
    `
    <img class="denied-img" src="./src/images/denied.svg" alt="denied" />
    <h4 class="denied-text">${variousText}</h4>
  `
  );
  main.prepend(vidgetBox);
  setTimeout(() => {
    vidgetBox.classList.replace("denied--open", "denied--closed");
    setTimeout(() => {
      main.removeChild(vidgetBox);
    }, 1000);
  }, 2000);
}
vidgetElems = limitExecByInterval(vidgetElems, 3000);

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

function extraMonthes(rent, container) {
  container.forEach((elem) => {
    let extraMonthesBox = document.createElement("p");
    extraMonthesBox.className = "extra-month";
    if (rent) {
      elem.append(extraMonthesBox);
      extraMonthesBox.innerText = "2 extra monthes";
    } else if (elem.querySelectorAll(".extra-month").length > 0) {
      elem.removeChild(elem.querySelector(".extra-month"));
    }
  });
}

export async function fillData() {
  let objValues = Object.values(await jsonData);
  let fillObj = finalStepObject;
  let inputsContainer = document.querySelector(".options__box");
  inputsContainer.querySelectorAll("input").forEach((elem, index) => {
    let properPriceVal = yearlyRent
      ? objValues[index].yearlyPrice
      : objValues[index].mounthlyPrice;
    if (elem.checked) {
      switch (elem.type) {
        case "radio":
          fillObj.plan[index] = {
            name: objValues[index].planName,
            price: properPriceVal,
          };
          break;
        case "checkbox":
          fillObj.adds[index] = {
            name: objValues[index].addsName,
            price: properPriceVal,
          };
          break;
      }
    }
    if (!elem.checked) {
      delete fillObj[Object.keys(elem.dataset)[0]][index];
    }
  });
}

//help func

function saveOptionCondition(obj, keyName) {
  return Object.hasOwn(obj, keyName);
}

async function getJsonData(json) {
  let res = await fetch(json);
  jsonData = await res.json();
}

function limitExecByInterval(fn, time) {
  let lock, execOnUnlock, args;
  return function () {
    args = arguments;
    if (!lock) {
      lock = true;
      setTimeout(function () {
        lock = false;
        if (execOnUnlock) {
          execOnUnlock = false;
        }
      }, time);
      return fn.apply(this, args);
    } else execOnUnlock = true;
  };
}
////////////////

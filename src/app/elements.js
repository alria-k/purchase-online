const sectionInner = document.querySelector(".section__inner");

export function formElems() {
  sectionInner.insertAdjacentHTML(
    "beforeend",
    `
      <div class="form__content first-step" data-step="first">
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
                      type="text"
                      placeholder="e.g. +1 234 567 890"
                    />
                  </form>
                  <div class="btn-box">
                    <button class="next-step__btn">Next Step</button>
                  </div>
                </div>
      `
  );
}
export function planElems(jsonFile, payrent) {
  let stepContainer = document.createElement("div");
  stepContainer.className = "form__content second-step";
  stepContainer.dataset.step = "second";
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
        <button class="next-step__btn">Next Step</button>
        <button class="back-step__btn">Go Back</button>
      </div>`
  );
  let planItemContainer = document.getElementsByClassName("plan__container");
  let planItemContainerArray = Array.from(planItemContainer);
  fetch(jsonFile)
    .then((response) => response.json())
    .then((json) =>
      json.map((item) => {
        planItemContainerArray.forEach((elem) => {
          elem.insertAdjacentHTML(
            "beforeend",
            `
                <li class="plan__item">
                <input
                  class="plan-radio"
                  type="radio"
                  name="plan"
                  data-plan="arcade"
                />
                <div class="custom__radio">
                  <img
                    class="plan__img"
                    src=${item.img}
                    alt="arcade-img"
                  />
                  <div class="plan__item-text">
                    <h1 class="tarif__title">${item.planName}</h1>
                    <p class="tarif__description">$${
                      payrent
                        ? item.planPrice * 10 + "/yr"
                        : item.planPrice + "/mo"
                    }</p>
                  </div>
                </div>
              </li>
                  `
          );
        });
      })
    );
}
export function addsElems(jsonFile, payrent) {
  let stepContainer = document.createElement("div");
  stepContainer.className = "form__content third-step";
  stepContainer.dataset.step = "third";
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
          <button class="next-step__btn">Next Step</button>
          <button class="back-step__btn">Go Back</button>
        </div>
        `
  );
  let addsItemContainer = document.getElementsByClassName("adds__item-box");
  let addsItemContainerArray = Array.from(addsItemContainer);
  fetch(jsonFile)
    .then((response) => response.json())
    .then((json) =>
      json.map((item) => {
        addsItemContainerArray.forEach((elem) => {
          elem.insertAdjacentHTML(
            "beforeend",
            `
              <li class="adds__item">
                <div class="adds-checkbox__container">
                  <input
                    class="adds-checkbox"
                    type="checkbox"
                    name="adds-checkbox"
                  />
                  <label
                    class="adds-checkbox--custom"
                    for="adds-checkbox"
                  ></label>
                </div>
                <div class="adds__item-content">
                  <div class="adds__item-text">
                    <h1 class="tarif__title">${item.addsName}</h1>
                    <p class="tarif__description">
                      ${item.addsBenefits}
                    </p>
                  </div>
                  <div class="adds__item-price">
                    <p class="tarif__description">+$${
                      payrent
                        ? item.addsPrice * 10 + "/yr"
                        : item.addsPrice + "/mo"
                    }</p>
                  </div>
                </div>
              </li>
              `
          );
        });
      })
    );
}

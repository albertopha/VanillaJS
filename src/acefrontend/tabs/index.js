const TABS = [
  {
    "label": "Description",
    "content": "The worlds fastest fidget spinner"
  },
  {
    "label": "Specs",
    "content": "Slime green, low friction ball bearings, with dual finger grips"
  },
  {
    "label": "Reviews",
    "content": "I have one. It's pretty good."
  }
];

let selected = 0;
const tabGroup = document.querySelector(".tab-group");
const tabs = document.querySelector(".tabs");
const content = document.querySelector(".content");

updateView();

function updateView() {
  const selectedTab = TABS[selected];
  content.innerHTML = selectedTab.content;
  tabs.innerHTML = TABS.map((tab, i) => (
    `<button class="${i === selected ? "active" : ""}" data-index="${i}">${tab.label}</button>`
  )).join("");
}

function registerListeners() {
  tabs.addEventListener("click", (evt) => {
    console.log(evt.target);
    if (!evt.target.matches("button")) return;
    const btn = evt.target;
  	selected = btn.dataset.index;
    updateView();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  registerListeners();
});
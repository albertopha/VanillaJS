"use strict";
;
;
;
const store = {
    project: {
        title: "",
        description: "",
        people: 0
    },
    activeProjects: [],
    finishedProjects: [],
};
const draggable = {
    isDraggable: false,
    dragTarget: {
        startX: -1,
        startY: -1,
        top: -1,
        left: -1,
        element: null
    }
};
const draggableContainer = document.querySelector(".draggable-container");
const addProjectForm = document.getElementById("add-project-form");
const activeProjectForm = document.getElementById("active-projects");
const title = addProjectForm.querySelector("#title");
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", onStopDrag);
addProjectForm.addEventListener("submit", onAddProject);
addProjectForm.addEventListener("input", onChangeInput);
activeProjectForm.addEventListener("mousedown", onMouseDown);
function onAddProject(event) {
    event.preventDefault();
    const newProject = Object.assign({}, store.project);
    store.activeProjects.push(newProject);
    displayActiveProject(newProject);
    resetForm();
}
function onMouseDown(event) {
    if (!event || !event.target) {
        return;
    }
    draggable.dragTarget.element = event.target;
    draggable.isDraggable = true;
    draggable.dragTarget.left = draggable.dragTarget.element.offsetLeft;
    draggable.dragTarget.top = draggable.dragTarget.element.offsetTop;
    draggable.dragTarget.startX = event.pageX;
    draggable.dragTarget.startY = event.pageY;
}
function onDrag(event) {
    const { left, top, startX, startY, element } = draggable.dragTarget;
    if (!draggable.isDraggable ||
        !element) {
        return;
    }
    element.style.left = String(left + event.pageX - startX) + "px";
    element.style.top = String(top + event.pageY - startY) + "px";
}
function onStopDrag() {
    if (draggable.isDraggable) {
        draggable.isDraggable = false;
        draggable.dragTarget = {
            startX: -1,
            startY: -1,
            top: -1,
            left: -1,
            element: null
        };
    }
}
function onChangeInput(event) {
    if (event && event.target) {
        const id = event.target.id;
        const value = event.target.value;
        switch (id) {
            case "title":
                store.project.title = value;
                break;
            case "description":
                store.project.description = value;
                break;
            case "people":
                store.project.people = Number(value);
                break;
            default:
                break;
        }
    }
}
function displayActiveProject(project) {
    const { title, description, people } = project;
    const card = document.createElement("project-card");
    const titleElem = document.createElement("h3");
    const descriptionElem = document.createElement("div");
    const peopleElem = document.createElement("div");
    titleElem.textContent = title;
    titleElem.setAttribute("slot", "title");
    descriptionElem.textContent = description;
    descriptionElem.setAttribute("slot", "description");
    peopleElem.textContent = String(people);
    peopleElem.setAttribute("slot", "people");
    card.appendChild(titleElem);
    card.appendChild(descriptionElem);
    card.appendChild(peopleElem);
    activeProjectForm.appendChild(card);
}
function resetForm() {
    store.project = {
        title: "",
        description: "",
        people: 0
    };
    addProjectForm.reset();
}
//# sourceMappingURL=app.js.map
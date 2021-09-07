"use strict";
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
    isDraggable: false
};
const addProjectForm = document.querySelector("#add-project-form");
const title = addProjectForm.querySelector("#title");
document.addEventListener("mousedown", onDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", onStopDrag);
addProjectForm.addEventListener("submit", onAddProject);
addProjectForm.addEventListener("input", onChangeInput);
function onDrag(event) {
    if (!store.isDraggable) {
        store.isDraggable = true;
    }
    console.log(event);
}
function onStopDrag(event) {
    if (store.isDraggable) {
        store.isDraggable = false;
    }
    console.log(event);
}
function onAddProject(event) {
    event.preventDefault();
    console.log("** event == ", event);
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
//# sourceMappingURL=app.js.map
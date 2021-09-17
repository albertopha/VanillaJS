/*******************************
 *         Interface           *
 *******************************/
interface Project {
	title: string,
	description: string,
	people: number
};

interface Store {
	project: Project,
	activeProjects: Project[],
	finishedProjects: Project[],
};

interface DragTarget {
	startX: number,
	startY: number,
	top: number,
	left: number,
	element: HTMLElement | null
};

interface Draggable {
	isDraggable: boolean,
	dragTarget: DragTarget
}

/*******************************
 *            Store            *
 *******************************/
const store: Store = {
	project: {
		title: "",
		description: "",
		people: 0
	},
	activeProjects: [],
	finishedProjects: [],
};

const draggable: Draggable  = {
	isDraggable: false,
	dragTarget: {
		startX: -1,
		startY: -1,
		top: -1,
		left: -1,
		element: null
	}
}

/*******************************
 *         Elements            *
 *******************************/
const draggableContainer = document.querySelector(".draggable-container");
const addProjectForm = document.getElementById("add-project-form")!;
const activeProjectForm = document.getElementById("active-projects")!;
const title = addProjectForm.querySelector("#title")!;

/*******************************
 *         Listeners           *
 *******************************/
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", onStopDrag);
addProjectForm.addEventListener("submit", onAddProject);
addProjectForm.addEventListener("input", onChangeInput);
activeProjectForm.addEventListener("mousedown", onMouseDown);

/*******************************
 *       Event callbacks       *
 *******************************/
function onAddProject(event: Event): void {
	event.preventDefault();
	const newProject = Object.assign({}, store.project);
	store.activeProjects.push(newProject);
	displayActiveProject(newProject);
	resetForm();
}

function onMouseDown(event: MouseEvent): void {
	if (!event || !event.target) {
		return;
	}

	draggable.dragTarget.element = event.target as HTMLElement;
	draggable.isDraggable = true;
	draggable.dragTarget.left = draggable.dragTarget.element.offsetLeft;
	draggable.dragTarget.top = draggable.dragTarget.element.offsetTop;
	draggable.dragTarget.startX = event.pageX;
	draggable.dragTarget.startY = event.pageY;
}

function onDrag(event: MouseEvent): void {
	const {
		left,
		top,
		startX,
		startY,
		element
	} = draggable.dragTarget;

	if (
		!draggable.isDraggable ||
		!element
	) {
		return;
	}

	element.style.left = String(left + event.pageX - startX) + "px";
	element.style.top= String(top + event.pageY - startY) + "px";
}

function onStopDrag(): void {
	if (draggable.isDraggable) {
		draggable.isDraggable = false;
		draggable.dragTarget = {
			startX: -1,
			startY: -1,
			top: -1,
			left: -1,
			element: null
		}
	}
}

function onChangeInput(event: Event): void {
	if (event && event.target) {
		const id = (<HTMLInputElement>event.target).id!;
		const value = (<HTMLInputElement>event.target).value!;

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


/*******************************
 *       Utility functions     *
 *******************************/
function displayActiveProject(project: Project): void {
	const {
		title,
		description,
		people
	} = project;
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

function resetForm(): void {
	// Reset the project state
	store.project = {
		title: "",
		description: "",
		people: 0
	};

	// Reset inputs
	(<HTMLFormElement> addProjectForm).reset();
}


/*******************************
 *          Execution          *
 *******************************/

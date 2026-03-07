// add avoid or visit sites to storage

const OVERRIDE_LIMIT_MIN = 1;
const OVERRIDE_LIMIT_MAX = 120;
const OVERRIDE_LIMIT_DEFAULT = 5;

function clampOverrideLimit(value) {
	const n = Number(value);
	if (Number.isNaN(n) || n < OVERRIDE_LIMIT_MIN) return OVERRIDE_LIMIT_DEFAULT;
	if (n > OVERRIDE_LIMIT_MAX) return OVERRIDE_LIMIT_MAX;
	return Math.floor(n);
}

function appendListElement(listId, value) {
	const ul = document.getElementById(listId);
	const listName = listId.replace('List', '');
	let li = document.createElement('li');
	li.classList.add('popup-list-item');
	let newItem = document.createElement('span');
	newItem.classList.add('popup-list-item-text');
	newItem.innerHTML = value;
	li.appendChild(newItem);
	const removeBtn = document.createElement('button');
	removeBtn.classList.add('popup-remove-btn');
	removeBtn.textContent = 'x';
	removeBtn.addEventListener('click', () => removeFromList(listName, value, li));
	li.appendChild(removeBtn);
	ul.appendChild(li);
}

function removeFromList(listName, value, liElement) {
	chrome.storage.local.get(listName, function(result) {
		const resultList = result[listName] || [];
		const index = resultList.indexOf(value);
		if (index === -1) return;
		const updatedList = [...resultList.slice(0, index), ...resultList.slice(index + 1)];
		chrome.storage.local.set({ [listName]: updatedList }).then(() => {
			liElement.remove();
		});
	});
}

function addToList(event, listName) { // listName = 'avoid' || 'visit'
	event.preventDefault();

	chrome.storage.local.get(listName, function(result){
		const resultList = result[listName] || [];
		const inputValue = document.getElementById(`${listName}Input`).value;

		chrome.storage.local.set({ [listName]: [...resultList, inputValue] }).then(() => {
			console.log(`${inputValue} added to ${listName} list`);
		});
	appendListElement(`${listName}List`, inputValue);
	});
}

window.addEventListener("DOMContentLoaded", (event) => {
	const eventHandlerWithArg = (event, arg) => addToList(event, arg);
  	const avoidButton = document.getElementById("avoidButton");
	avoidButton?.addEventListener("click", (event) => eventHandlerWithArg(event, "avoid"));

	const visitButton = document.getElementById("visitButton");
	visitButton?.addEventListener("click", (event) => eventHandlerWithArg(event, "visit"));

	// Override time limit
	chrome.storage.local.get("overrideLimitMinutes", (result) => {
		const input = document.getElementById("overrideLimitInput");
		if (input) {
			const stored = result.overrideLimitMinutes;
			input.value = stored != null ? clampOverrideLimit(stored) : OVERRIDE_LIMIT_DEFAULT;
		}
	});

	document.getElementById("limitForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = document.getElementById("overrideLimitInput");
		if (!input) return;
		const minutes = clampOverrideLimit(input.value);
		input.value = minutes;
		chrome.storage.local.set({ overrideLimitMinutes: minutes });

		const savedIndicator = document.getElementById("savedIndicator");
		if (savedIndicator) {
			savedIndicator.hidden = false;
			clearTimeout(savedIndicator._hideTimeout);
			savedIndicator._hideTimeout = setTimeout(() => {
				savedIndicator.hidden = true;
			}, 2000);
		}
	});

	// Settings toggle drawer
	const settingsToggle = document.getElementById("settingsToggle");
	const settingsDrawer = document.getElementById("settingsDrawer");
	if (settingsToggle && settingsDrawer) {
		settingsToggle.addEventListener("click", () => {
			const isExpanded = settingsDrawer.hidden;
			settingsDrawer.hidden = !isExpanded;
			settingsToggle.setAttribute("aria-expanded", isExpanded);
		});
	}

	chrome.storage.local.get("avoid", function(result){
		const avoidArray = result.avoid;
		if (avoidArray && avoidArray.length > 0) {
			avoidArray.map((avoidItem) => {
				appendListElement("avoidList", avoidItem);
			})
		}
	});

	chrome.storage.local.get("visit", function(result){
		const visitArray = result.visit;
		if (visitArray && visitArray.length > 0) {
			visitArray.map((visitItem) => {
				appendListElement("visitList", visitItem);
			})
		}
	});

});
// add avoid or visit sites to storage

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
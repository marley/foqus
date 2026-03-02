function appendListElement(listId, value) {
	const ul = document.getElementById(listId);
	let li = document.createElement('li');
	let newItem = document.createElement('span')
	newItem.innerHTML = value;
	li.appendChild(newItem);
	ul.appendChild(li);
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


function appendToList(listId, value) {
	const ul = document.getElementById(listId);
	let li = document.createElement('li');
	let newLink = document.createElement('a')
	newLink.setAttribute('href', value)
	newLink.innerHTML = value;
	li.appendChild(newLink);
	ul.appendChild(li);
}

function addToAvoidList(event) {
	event.preventDefault();

	chrome.storage.local.get("avoid", function(result){
		const avoidList = result.avoid || [];
		const inputValue = document.getElementById("avoidInput").value;

		chrome.storage.local.set({ "avoid": [...avoidList, inputValue] }).then(() => {
				console.log(`${inputValue} added to avoid list`);
		});
	appendToList("avoidList", inputValue);
	});
}

window.addEventListener("DOMContentLoaded", (event) => {
  const element = document.getElementById("avoidButton");
	element?.addEventListener("click", addToAvoidList);

	chrome.storage.local.get("avoid", function(result){
		const avoidArray = result.avoid;
		if (avoidArray && avoidArray.length > 0) {
			avoidArray.map((avoidItem) => {
				appendToList("avoidList", avoidItem);
			})
		}
	});

});


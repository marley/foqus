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

function updateEmptyState(listName) {
	const ul = document.getElementById(`${listName}List`);
	const emptyState = document.getElementById(`${listName}EmptyState`);
	if (!ul || !emptyState) return;
	emptyState.hidden = ul.children.length > 0;
}

function appendListElement(listId, value) {
	const ul = document.getElementById(listId);
	if (!ul) return;

	const listName = listId.replace('List', '');
	const li = document.createElement('li');
	li.classList.add('popup-list-item', 'popup-list-item-enter');

	const newItem = document.createElement('span');
	newItem.classList.add('popup-list-item-text');
	newItem.textContent = value;
	li.appendChild(newItem);

	const removeBtn = document.createElement('button');
	removeBtn.classList.add('popup-remove-btn');
	removeBtn.textContent = 'x';
	removeBtn.setAttribute('aria-label', `Remove ${value}`);
	removeBtn.addEventListener('click', () => removeFromList(listName, value, li));
	li.appendChild(removeBtn);

	ul.appendChild(li);
	updateEmptyState(listId.replace('List', ''));

	// Trigger enter animation
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			li.classList.add('popup-list-item-enter-active');
		});
	});
}

function removeFromList(listName, value, liElement) {
	chrome.storage.local.get(listName, function(result) {
		const resultList = result[listName] || [];
		const index = resultList.indexOf(value);
		if (index === -1) return;

		const updatedList = [...resultList.slice(0, index), ...resultList.slice(index + 1)];
		chrome.storage.local.set({ [listName]: updatedList }).then(() => {
			liElement.classList.remove('popup-list-item-enter', 'popup-list-item-enter-active');
			liElement.classList.add('popup-list-item-exit');
			liElement.addEventListener('transitionend', () => {
				liElement.remove();
				updateEmptyState(listName);
			}, { once: true });
		});
	});
}

function showSavedIndicator() {
	const savedIndicator = document.getElementById("savedIndicator");
	if (savedIndicator) {
		savedIndicator.hidden = false;
		clearTimeout(savedIndicator._hideTimeout);
		savedIndicator._hideTimeout = setTimeout(() => {
			savedIndicator.hidden = true;
		}, 2000);
	}
}

function addToList(event, listName) {
	event.preventDefault();

	const inputEl = document.getElementById("siteInput");
	if (!inputEl) return;

	const rawValue = inputEl.value;
	const inputValue = rawValue.trim();

	if (!inputValue) return;

	chrome.storage.local.get(listName, function(result) {
		const resultList = result[listName] || [];
		if (resultList.includes(inputValue)) return;

		chrome.storage.local.set({ [listName]: [...resultList, inputValue] }).then(() => {
			appendListElement(`${listName}List`, inputValue);
			inputEl.value = '';
		});
	});
}

function setInputMode(mode) {
	const inputSection = document.querySelector(".popup-input-section");
	const modeAvoid = document.getElementById("modeAvoid");
	const modeVisit = document.getElementById("modeVisit");
	const submitBtn = document.getElementById("siteButton");

	if (!inputSection || !modeAvoid || !modeVisit || !submitBtn) return;

	inputSection.setAttribute("data-mode", mode);
	modeAvoid.setAttribute("aria-pressed", mode === "avoid" ? "true" : "false");
	modeVisit.setAttribute("aria-pressed", mode === "visit" ? "true" : "false");
	modeAvoid.classList.toggle("popup-mode-btn--active", mode === "avoid");
	modeVisit.classList.toggle("popup-mode-btn--active", mode === "visit");
	submitBtn.classList.toggle("popup-submit-btn--visit", mode === "visit");
}

function setAccordionOpen(listName, open) {
	const isAvoid = listName === "avoid";
	const header = document.getElementById(isAvoid ? "accordionAvoid" : "accordionVisit");
	const body = document.getElementById(isAvoid ? "accordionAvoidBody" : "accordionVisitBody");
	const icon = header?.querySelector(".popup-accordion-icon");

	if (!header || !body) return;

	header.setAttribute("aria-expanded", String(open));
	body.hidden = !open;
	if (icon) icon.textContent = open ? "▾" : "▸";
}

function isAccordionOpen(listName) {
	const isAvoid = listName === "avoid";
	const body = document.getElementById(isAvoid ? "accordionAvoidBody" : "accordionVisitBody");
	return body && !body.hidden;
}

window.addEventListener("DOMContentLoaded", () => {
	let activeMode = "avoid";
	let userManuallyOpenedBoth = false;

	// Prefill single input with current tab hostname
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs && tabs[0];
		if (tab && tab.url) {
			try {
				const { hostname } = new URL(tab.url);
				if (hostname) {
					const siteInput = document.getElementById("siteInput");
					if (siteInput) siteInput.value = hostname;
				}
			} catch {}
		}
	});

	// Mode toggle buttons
	document.getElementById("modeAvoid")?.addEventListener("click", () => {
		if (activeMode === "avoid") return;
		activeMode = "avoid";
		setInputMode(activeMode);

		if (!userManuallyOpenedBoth) {
			setAccordionOpen("avoid", true);
			setAccordionOpen("visit", false);
		}
	});

	document.getElementById("modeVisit")?.addEventListener("click", () => {
		if (activeMode === "visit") return;
		activeMode = "visit";
		setInputMode(activeMode);

		if (!userManuallyOpenedBoth) {
			setAccordionOpen("visit", true);
			setAccordionOpen("avoid", false);
		}
	});

	// Single form submit
	document.getElementById("siteForm")?.addEventListener("submit", (e) => addToList(e, activeMode));

	// Accordion headers
	function handleAccordionClick(listName) {
		const open = isAccordionOpen(listName);
		const otherName = listName === "avoid" ? "visit" : "avoid";
		const otherOpen = isAccordionOpen(otherName);

		// User is manually opening; if both will be open after this, set flag
		if (!open && otherOpen) userManuallyOpenedBoth = true;
		// User is closing; no longer both open, so clear flag
		if (open) userManuallyOpenedBoth = false;

		setAccordionOpen(listName, !open);
	}

	document.getElementById("accordionAvoid")?.addEventListener("click", () => handleAccordionClick("avoid"));
	document.getElementById("accordionVisit")?.addEventListener("click", () => handleAccordionClick("visit"));

	// Override time limit
	chrome.storage.local.get("overrideLimitMinutes", (result) => {
		const input = document.getElementById("overrideLimitInput");
		if (input) {
			const stored = result.overrideLimitMinutes;
			input.value = stored != null ? clampOverrideLimit(stored) : OVERRIDE_LIMIT_DEFAULT;
		}
	});

	// Custom overlay title
	chrome.storage.local.get("customOverlayTitle", (result) => {
		const input = document.getElementById("overlayTitleInput");
		if (input) input.value = result.customOverlayTitle || "";
	});
	document.getElementById("overlayTitleForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = document.getElementById("overlayTitleInput");
		if (!input) return;
		const val = input.value.trim();
		if (val) {
			chrome.storage.local.set({ customOverlayTitle: val }, showSavedIndicator);
		} else {
			chrome.storage.local.remove("customOverlayTitle", showSavedIndicator);
		}
	});

	// Prefer reduced motion
	chrome.storage.local.get("preferReducedMotion", (result) => {
		const checkbox = document.getElementById("preferReducedMotion");
		if (checkbox) {
			checkbox.checked = result.preferReducedMotion === true;
		}
	});
	document.getElementById("preferReducedMotion")?.addEventListener("change", (e) => {
		chrome.storage.local.set({ preferReducedMotion: e.target.checked });
		showSavedIndicator();
	});

	// Dark mode
	chrome.storage.local.get("darkMode", (result) => {
		document.body.classList.toggle("dark-mode", result.darkMode === true);
		const checkbox = document.getElementById("darkMode");
		if (checkbox) {
			checkbox.checked = result.darkMode === true;
		}
	});
	document.getElementById("darkMode")?.addEventListener("change", (e) => {
		const checked = e.target.checked;
		chrome.storage.local.set({ darkMode: checked });
		document.body.classList.toggle("dark-mode", checked);
		showSavedIndicator();
	});

	document.getElementById("limitForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = document.getElementById("overrideLimitInput");
		if (!input) return;
		const minutes = clampOverrideLimit(input.value);
		input.value = minutes;
		chrome.storage.local.set({ overrideLimitMinutes: minutes });
		showSavedIndicator();
	});

	// Settings toggle drawer
	const settingsToggle = document.getElementById("settingsToggle");
	const settingsDrawer = document.getElementById("settingsDrawer");
	if (settingsToggle && settingsDrawer) {
		settingsToggle.addEventListener("click", () => {
			const isExpanded = settingsDrawer.hidden;
			settingsDrawer.hidden = !isExpanded;
			settingsToggle.setAttribute("aria-expanded", String(isExpanded));
		});
	}

	chrome.storage.local.get("avoid", function(result) {
		const avoidArray = result.avoid;
		if (avoidArray && avoidArray.length > 0) {
			avoidArray.forEach((avoidItem) => appendListElement("avoidList", avoidItem));
		} else {
			updateEmptyState("avoid");
		}
	});

	chrome.storage.local.get("visit", function(result) {
		const visitArray = result.visit;
		if (visitArray && visitArray.length > 0) {
			visitArray.forEach((visitItem) => appendListElement("visitList", visitItem));
		} else {
			updateEmptyState("visit");
		}
	});
});

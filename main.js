// Given a number n, get k random numbers in the range
// [0,n) without repetition. Precondition that n >= k.
function getRandomNumbersWithoutRepetition(n, k) {
  var random_numbers = [];
  while (random_numbers.length < k) {
    let i = Math.floor(Math.random() * n);
    if (random_numbers.indexOf(i) === -1) {
      random_numbers.push(i);
    }
  }
  return random_numbers;
}

// Given an array, gets n random elements without
// replacement.
function getRandomElements(n, arr) {
  let random_elements = [];
  let len = arr.length;
  let random_indices = getRandomNumbersWithoutRepetition(len, n);
  for (random_index of random_indices) {
    random_elements.push(arr[random_index]);
  }
  return random_elements;
}

// Given an array of data and the number of headlines to pull,
// initialize a new puzzle with that number of headlines.
function startNewPuzzle(n, data) {
  let puzzle_data = getRandomElements(n, data);

  // Split up headlines for ease of access.
  for (element of puzzle_data) {
    let element_headline = element.headlines;
    let split_headline = element_headline.split(" Now");
    element.headline_start = split_headline[0];
    element.headline_end = "Now" + split_headline[1];
  }
  deleteCurrentHeadlineElements();
  buildHeadlineElements(puzzle_data);
  shuffleHeadlineEndElements();
}

// Deletes current headline elements.
function deleteCurrentHeadlineElements() {
  // Delete existing elements.
  let headline_start_container = document.getElementById(
    "headline-start-container"
  );
  while (headline_start_container.firstChild) {
    headline_start_container.removeChild(headline_start_container.firstChild);
  }
  let headline_end_container = document.getElementById(
    "headline-end-container"
  );
  while (headline_end_container.firstChild) {
    headline_end_container.removeChild(headline_end_container.firstChild);
  }
}

// Given an array of headline elements, build both start and end
// elements for each.
function buildHeadlineElements(data) {
  for (i in data) {
    let element = data[i];
    buildHeadlineFromTemplate(true);
    buildHeadlineFromTemplate(false);

    // Build template, given a side (either start or end).
    function buildHeadlineFromTemplate(isStart) {
      let side = isStart ? "start" : "end";
      let side_prop = isStart ? element.headline_start : element.headline_end;

      // Get and copy template.
      var headline_template = document.getElementById(
        "headline-" + side + "-element-template"
      );
      var clone = headline_template.cloneNode(true); // Make copy.
      clone.children.namedItem("headline-text").textContent = side_prop;
      clone.style.display = "inline-block"; // Make copy visible.

      // Add attribute.
      if (!isStart) {
        clone.setAttribute("num", i);
      } else {
        clone.setAttribute("link", element.hrefs);
      }

      // Add it to the DOM.
      document
        .getElementById("headline-" + side + "-container")
        .appendChild(clone);
    }
  }
}

// Shuffle headling-end elements.
// Fisher-Yates variant.
function shuffleHeadlineEndElements() {
  var headline_end_container = document.querySelector(
    "#headline-end-container"
  );
  for (var i = headline_end_container.children.length; i >= 0; i--) {
    headline_end_container.appendChild(
      headline_end_container.children[(Math.random() * i) | 0]
    );
  }
}

// Check answer.
// Returns the number of incorrectly ordered items.
// Also changes the color to indicate correct/incorrect.
function checkOrder(PUZZLE_SIZE) {
  var headline_end_container = document.querySelector(
    "#headline-end-container"
  );

  let incorrect_count = 0;
  for (i in headline_end_container.children) {
    let element = headline_end_container.children[i];
    if (i < PUZZLE_SIZE) {
      if(element.getAttribute("num") !== i) {
        element.style.backgroundColor = "salmon";
        incorrect_count += 1;
      } else {
        element.style.backgroundColor = "lightgreen";
      }
    }
  }

  return incorrect_count;
}

// Sets states depending on how well the player played.
function setButtonDependingOnAnswer(incorrect_count, PUZZLE_SIZE) {
  let reset_button = document.getElementById("interaction-button");
  if (incorrect_count == 0) {
    // Perfect score!
    reset_button.style.backgroundColor = "gold";
    reset_button.innerText = "All correct! Try again?";
  } else {
    // Not perfect score :(
    reset_button.style.backgroundColor = "salmon";
    reset_button.innerText = String(incorrect_count) + " wrong. Try again?";
  }
}

// Turns left hand side into links.
function changeHeadlinesToLinks() {
  let headline_start_container = document.querySelector(
    "#headline-start-container"
  );
  for (element of headline_start_container.children) {
    let current_text = element.textContent;
    let current_link = element.getAttribute("link");
    element.children.namedItem("headline-text").innerHTML = current_text + '(<a href="' + current_link + '">link</a>)';
  }
}
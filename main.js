// Given an array, gets n random elements without
// replacement.
function getRandomElements(n, arr) {
  let random_elements = [];
  let len = arr.length;

  // Given a number n, get k random numbers in the range
  // [0,n) without repetition. Precondition that n >= k.
  function getRandomNumbersWithoutRepetition(n, k) {
    var random_numbers = [];
    while (random_numbers.length < k) {
      let i = Math.floor(Math.random() * n) + 1;
      if (random_numbers.indexOf(i) === -1) {
        random_numbers.push(i);
      }
    }
    return random_numbers;
  }

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
  console.log(puzzle_data);
  buildHeadlineElements(puzzle_data);
}

// Given an array of headline elements, build both start and end
// elements for each.
function buildHeadlineElements(data) {
  for (element of data) {
    buildHeadlineFromTemplate(true);
    buildHeadlineFromTemplate(false);

    // Build template, given a side (either start or end).
    function buildHeadlineFromTemplate(isStart) {
      let side = isStart ? "start" : "end";
      let side_prop = isStart ? element.headline_start : element.headline_end;
      
      // Get and copy template.
      var headline_template = document.getElementById("headline-" + side + "-element-template");
      var clone = headline_template.cloneNode(true); // Make copy.
      clone.children.namedItem("headline-text").textContent = side_prop;
      clone.style.display="inline-block"; // Make copy visible.

      // Add it to the DOM.
      document.getElementById("headline-" + side + "-container").appendChild(clone)
    }
  }
}
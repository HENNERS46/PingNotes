
var originalOrder = [];

function myFunction() {
    var x = document.getElementById("myInput");
    x.value = x.value.toLowerCase();
    if (x.value.includes('protagonist')) {
        x.classList.add("blue");
    } else if (x.value.includes('beginning') || x.value.includes('opening')) {
        x.classList.add("green");
    } else if (x.value.includes('antagonist')) {
        x.classList.add("red");
    } else if (x.value.includes('backstory')) {
        x.classList.add("pink");
    } else if (x.value.includes('end')) {
        x.classList.add("purple");
    } else if (x.value.includes('middle')) {
        x.classList.add("yellow");
    } else if (x.value.includes('stray-character')) { // Moved this line up
        x.classList.add("brown");
    } else if (x.value.includes('stray')) { // This line is now below the one that checks for 'stray-character'
        x.classList.add("grey");
    } else if (x.value.includes('element')) {
        x.classList.add("lightgreen");
    } else if (x.value.includes('world')) {
        x.classList.add("stripey");
    } else if (x.value.includes('character')) {
        x.classList.add("pink");
    }
}

function deleteBubble(bubble) {
    // Remove the bubble from the container
    bubble.parentNode.removeChild(bubble);

    // Remove the bubble from the originalOrder array
    var index = originalOrder.indexOf(bubble);
    if (index !== -1) {
        originalOrder.splice(index, 1);
    }
}


function createBubble(event) {
    var input = document.getElementById("myInput");
    var container = document.getElementById("bubbleContainer");

    if (event.keyCode === 13) { // Enter key
        var bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.contentEditable = true; // Make the bubble editable
        bubble.oninput = function() { updateBubble(bubble); }; // Update the bubble's color when the text is changed
        bubble.innerHTML = input.value;

        // Create a delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24">
        <path fill="black" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    `;
        deleteButton.onclick = function() { deleteBubble(bubble); };

        // Add the delete button to the bubble
        bubble.appendChild(deleteButton);

        // Copy the input's class to the bubble
        bubble.className += " " + input.className;

        // Add the new bubble to the top of the container
        container.insertBefore(bubble, container.firstChild);

        // Save the original order of the bubbles
        originalOrder = Array.prototype.slice.call(container.children);

        // Clear the input
        input.value = "";
        input.className = "";
    }
}

function sortByColor(color) {
    var container = document.getElementById("bubbleContainer");
    var bubbles = container.getElementsByClassName("bubble");

    // Convert the HTMLCollection to an array
    bubbles = Array.prototype.slice.call(bubbles);

    // Sort the bubbles by color
    bubbles.sort(function(a, b) {
        var aIsColor = a.classList.contains(color);
        var bIsColor = b.classList.contains(color);

        return bIsColor - aIsColor; // Move the bubbles with the specified color to the top
    });

    // Reorder the bubbles in the container
    for (var i = 0; i < bubbles.length; i++) {
        container.appendChild(bubbles[i]);
    }
}

function restoreOrder() {
    var container = document.getElementById("bubbleContainer");

    // Reorder the bubbles in the container to their original order
    for (var i = 0; i < originalOrder.length; i++) {
        container.appendChild(originalOrder[i]);
    }
}


function updateBubble(bubble) {
    var text = bubble.innerHTML.toLowerCase();

    // Remove all color classes from the bubble
    bubble.classList.remove("blue", "green", "red", "pink", "purple", "yellow", "grey", "brown", "lightgreen", "stripey");

    // Add the appropriate color class to the bubble based on the text
    if (text.includes('protagonist')) {
        bubble.classList.add("blue");
    } else if (text.includes('beginning')) {
        bubble.classList.add("green");
    } else if (text.includes('antagonist')) {
        bubble.classList.add("red");
    } else if (text.includes('backstory')) {
        bubble.classList.add("pink");
    } else if (text.includes('end')) {
        bubble.classList.add("purple");
    } else if (text.includes('middle')) {
        bubble.classList.add("yellow");
    } else if (text.includes('stray')) {
        bubble.classList.add("grey");
    } else if (text.includes('stray-character')) {
        bubble.classList.add("brown");
    } else if (text.includes('element')) {
        bubble.classList.add("lightgreen");
    } else if (text.includes('world')) {
        bubble.classList.add("stripey");
    }
}


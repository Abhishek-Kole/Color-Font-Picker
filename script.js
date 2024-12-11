// page sizes
const sizes = {
    A0: { width: 841, height: 1189 },
    A1: { width: 594, height: 841 },
    A2: { width: 420, height: 594 },
    A3: { width: 297, height: 420 },
    A4: { width: 210, height: 297 },
};

const dropdownButton = document.getElementById("pg");
const dropdownList = document.getElementById('list');
const page = document.getElementById('text');
const container = document.querySelector('.left');

// show page-size list
dropdownButton.addEventListener('click', () => {
    if (dropdownList.style.display == "block") {
        dropdownList.style.display = "none";
    }
    else {
        dropdownList.style.display = "block";
    }
});

// Set the page size based on the selected aspect ratio and left-container
dropdownList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const ratio = event.target.dataset.ratio; // Get the aspect ratio
        console.log(ratio)
        const [widthRatio, heightRatio] = ratio.split(':').map(Number);

        // Container dimensions
        const containerWidth = container.offsetWidth;
        console.log(containerWidth)
        const containerHeight = container.offsetHeight;
        console.log(containerHeight)

        // Calculate new dimensions
        let newWidth = containerWidth;
        let newHeight = (newWidth * heightRatio) / widthRatio;
        console.log(newHeight)

        // If height exceeds container's height, adjust width
        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            console.log(newHeight)
            newHeight = containerHeight - 50;
            newWidth = (newHeight * widthRatio) / heightRatio - 50;
            console.log(newWidth)
        }

        // Apply new dimensions to the page
        page.style.width = `${newWidth}px`;
        page.style.height = `${newHeight}px`;

        // Update dropdown button text
        dropdownButton.innerHTML = `<button class="btn">Aspect Ratio: ${ratio}</button>`;

        // Close the dropdown
        dropdownList.style.display = "none";
    }
});

// downloading as image
document.getElementById('downloadImageButton').addEventListener('click', function () {
    const div = document.getElementById('text');
    html2canvas(div).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Convert canvas to image URL
        link.download = 'div-content.png'; // File name
        link.click();
    });
});

const textElement = document.getElementById('text');

// color buttons for text and background
const colors = [
    "red", "green", "silver", "grey", "white", "black", "maroon", 
    "yellow", "olive", "lime", "aqua", "teal", "blue", "navy", 
    "fuchsia", "purple"
];

document.querySelectorAll('.color-buttons').forEach(buttonContainer => {
    const style = buttonContainer.dataset.style;

    colors.forEach(color => {
        const button = document.createElement('button');
        button.style.backgroundColor = color;
        button.addEventListener('click', () => {
            textElement.style[style] = color;
        });
        buttonContainer.appendChild(button);
    });
});

// Custom colors
document.getElementById('colorPicker').addEventListener('input', (e) => {
    textElement.style.color = e.target.value;
});
document.getElementById('colorPicker2').addEventListener('input', (e) => {
    textElement.style.backgroundColor = e.target.value;
});

//font buttons
const fonts = [
    "Roboto, sans-serif", "IBM Plex Mono", "Cedarville Cursive", 
    "Fanwood Text", "Yuji Mai", "Jaro", "Ojuju", "Anton SC"
];

const fontContainer = document.querySelector('.font-buttons');
fonts.forEach(font => {
    const button = document.createElement('button');
    button.textContent = "AaBb";
    button.style.fontFamily = font;
    button.addEventListener('click', () => {
        textElement.style.fontFamily = font;
    });
    fontContainer.appendChild(button);
});

// Reset button
document.getElementById('resetButton').addEventListener('click', () => {
    location.reload();
});

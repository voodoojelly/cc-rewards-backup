const merchantCardTemplate = document.querySelector("[merchant-card-template]")
const merchantCardContainer = document.querySelector("[data-merchant-card-container]")
const searchInput = document.querySelector("[data-search]")

let merchants = []

function readCSV(){
    const csvURL = "./citibank.csv";

    fetch(csvURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV. Status: ${response.status}`);
        }
        return response.text();
    })
    .then((csvContent) => {
        // Parse the CSV content
        const csvData = parseCSV(csvContent);

        // Display the parsed data
        displayData(merchants);
    })
    .catch(error => {
        console.error(`Error: ${error.message}`);
    });
}
function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const rowData = {};

        for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = values[j];
        }

        merchants.push(rowData);
    }

    console.log('Parsed CSV data:', merchants);
    return merchants;
}

function displayData() {

    merchants.forEach(merchant => {
      const card = merchantCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[merchant-header]")
      const body = card.querySelector("[merchant-body]")
      const url = card.querySelector("[merchant-url]")
      
    // Create a new anchor element
    const moreButton = document.createElement("a");
    moreButton.setAttribute("href",merchant.offerpage);

    // Set the button text (you can customize this)
    moreButton.textContent = "Click for more";

    // Add the CSS class for styling
    moreButton.classList.add("button-style");
      
    url.appendChild(moreButton);

      header.textContent = merchant.name
      body.textContent = merchant.offermain
    //   url.textContent = merchant.offerpage

      merchant.element = card
      merchantCardContainer.append(card)
})
}

readCSV();

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    merchants.forEach (merchant => {
        const isVisible = merchant.name.toLowerCase().includes(value)
        merchant.element.classList.toggle("hide",!isVisible)
    })
});






// Tuloksena näkyvä:
/* <div id="choice1-progress" class="progress-bar" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20%</div> */
// Width on barin näkyvä osa!

// Vaihtoehtona näkyvä (ainoastaan widthillä on väliä):
// style="width: 100%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Vaihtoehto 1</div>

document.getElementById('poll-card');


// BING:
// Assume you have a container element with the ID 'cbh'
var cbh = document.getElementById('cb');

// Create the checkbox
var cb = document.createElement('input');
cb.type = 'checkbox';
cb.name = 'myCheckbox'; // Set a name for the checkbox
cb.value = 'option1'; // Set a value for the checkbox

// Create the label
var label = document.createElement('label');
label.htmlFor = 'myCheckbox'; // Match the label to the checkbox
label.appendChild(document.createTextNode('Vaihtoehto 1')); // Add label text

// Append the checkbox and label to the container
cbh.appendChild(cb);
cbh.appendChild(label);

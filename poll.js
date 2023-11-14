export function createCard(id, subject, description, choices) {
    const pollContainer = document.getElementById('poll-container');
    const pollName = `poll${id}`;
    
    // Card container
    const newCard = document.createElement('div');
    newCard.id = `poll-card${id}`;
    newCard.classList.add('col', 'mb-4');
    const div1 = document.createElement('div');
    div1.classList.add('card');
    newCard.appendChild(div1);
    const div2 = document.createElement('div');
    div2.classList.add('card-body', 'text-center');
    div1.appendChild(div2);

    // Subject and description
    const header = document.createElement('h5');
    header.classList.add('fw-bold', 'mb-3');
    header.textContent = subject;
    div2.appendChild(header);
    const desc = document.createElement('p');
    desc.classList.add('bg-body-tertiary', 'rounded-1', 'p-2', 'mx-4');
    desc.textContent = description;
    div2.appendChild(desc);
    div2.appendChild(document.createElement('hr'));

    // Create the form
    const form = document.createElement('form');
    form.classList.add('px-4');
    // form.action = "";   // NOTE / TODO: This would be used to send the form to a server if there was one
    
    // Loop through the choices and create their form elements
    let choiceId = 0;
    choices.forEach(choice => {
        const newChoice = document.createElement('div');
        newChoice.classList.add('form-check', 'mb-2');

        // Radio button
        const radio = document.createElement('input');
        radio.classList.add('form-check-input', 'bg-dark', 'link-dark');
        radio.type = 'radio';
        radio.name = pollName;
        // radio.id = `${radio.name}-choice${choiceId}`;    // TODO: choose between strings and just int
        // radio.id = `choice${choiceId}`;
        radio.id = choiceId;

        // Progress bar
        const progressDiv = document.createElement('div');
        progressDiv.classList.add('progress');
        progressDiv.style.height = '2rem';
        const progressBar = document.createElement('div');
        progressBar.id = (`${radio.id}-progress`);
        progressBar.classList.add('progress-bar', 'bg-dark');
        progressBar.style.width = '100%';   // NOTE: Full bar to hide the progress
        // Set ARIA attributes
        progressDiv.setAttribute('role', 'progressbar');
        progressDiv.setAttribute('aria-valuemin', '0');
        progressDiv.setAttribute('aria-valuemax', '100');
        progressDiv.setAttribute('aria-valuenow', '0');

        // Preselect first choice       // TODO: keep or scrap
        if (choiceId === 0) {
            radio.checked = true;
            progressBar.classList.replace('bg-dark', 'bg-secondary');
        } else {
            progressBar.classList.add('bg-dark');
        }

        // Change colour when selected
        form.addEventListener('click', () => {
            if (radio.checked === true) {
                progressBar.classList.replace('bg-dark', 'bg-secondary');
            } else {
                progressBar.classList.replace('bg-secondary', 'bg-dark');
            }
        }) 

        // Extend the click to whole progress bar
        progressBar.addEventListener('click', () => {
            radio.checked = true;
        })

        // Label
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor =  radio.id;
        label.textContent = choice;
        
        progressBar.appendChild(label);
        progressDiv.appendChild(progressBar);
        newChoice.appendChild(radio);
        newChoice.appendChild(progressDiv);
        form.appendChild(newChoice);
        choiceId++;
    });
    div2.appendChild(form);

    // Footer
    const footer = document.createElement('div');
    footer.classList.add('card-footer', 'text-end');
    const voteBtn = document.createElement('button');
    voteBtn.classList.add('btn', 'btn-outline-dark');
    voteBtn.type = 'button';
    voteBtn.id = `vote-button-${id}`;
    voteBtn.textContent = 'Äänestä';
    footer.appendChild(voteBtn);
    div1.appendChild(footer);

    pollContainer.appendChild(newCard);

    // Vote button functionality
    voteBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const selectedChoice = document.querySelector(`input[name=${pollName}]:checked`);
        vote(selectedChoice);
        showResults(form);
    })
}

function vote(choice) {
    // console.log(choice.name, choice.id);

    // Add +1 to the choice
    // Update vote counts and ARIA
    // Save to localStorage
}

function showResults(form) {
    const choices = form.children;
    for (const choice of choices) {
        const input = choice.childNodes[0];
        const progressDiv = choice.childNodes[1];
        const progressBar = progressDiv.childNodes[0];
        const label = progressBar.childNodes[0];

        // Highlight user's choice
        if (input.checked) {
            progressBar.classList.replace('bg-secondary', 'bg-success');
        }

        input.classList.add('invisible');
        label.innerHTML += '<br>50%';
        progressBar.style.width = '50%';
        progressDiv.style.height = '3rem';
    }
}
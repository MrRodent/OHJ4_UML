// Tuloksena näkyvä:
/* <div id="choice1-progress" class="progress-bar" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20%</div> */
// Width on barin näkyvä osa!

// Vaihtoehtona näkyvä (ainoastaan widthillä on väliä):
// style="width: 100%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Vaihtoehto 1</div>

export function createCard(id, subject, description, choices) {
    const pollContainer = document.getElementById('poll-container');
    
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

        const radio = document.createElement('input');
        radio.classList.add('form-check-input');
        radio.type = 'radio';
        radio.name = `poll${id}`;
        radio.id = `${radio.name}-choice${choiceId}`;

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
}
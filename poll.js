export class pollCard {
    constructor (id, subject, description, choices) {
        this.id = id;
        this.subject = subject;
        this.description = description;
        this.choices = choices;

        this.pollName = `poll${id}`;

        // Bookkeeping
        this.totalVotes = 0;
        this.alreadyVoted = false;

        // Values to be created and used in other functions
        this.form;

        // Create a vote counter for each choice
        this.voteCounts = {};
        choices.forEach((choice, index) => {
            if (false) {
                this.voteCounts[index] = 0;
            } else {    // Random votes for testing purposes
                const random = Math.floor(Math.random() * 40) + 10;
                this.totalVotes += random;
                this.voteCounts[index] = random;
            }
        });

        this.create();
    }

    create() {
        const pollContainer = document.getElementById('poll-container');
        
        // Card container
        const newCard = document.createElement('div');
        newCard.id = `poll-card${this.id}`;
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
        header.textContent = this.subject;
        div2.appendChild(header);
        const desc = document.createElement('p');
        desc.classList.add('mx-4');
        desc.textContent = this.description;
        div2.appendChild(desc);
        div2.appendChild(document.createElement('hr'));
    
        // Create the form
        this.form = document.createElement('form');
        this.form.classList.add('px-4');
        this.form.action = "";   // NOTE: This would be used to send the form to a server if there was one
    
        // Loop through the choices and create their form elements
        let choiceIndex = 0;
        this.choices.forEach(choice => {
            const newChoice = document.createElement('div');
            newChoice.classList.add('form-check', 'mb-2');
    
            // Radio button
            const radio = document.createElement('input');
            radio.classList.add('form-check-input', 'bg-body-tertiary', 'link-dark');
            radio.type = 'radio';
            radio.name = this.pollName;
            radio.id = `${radio.name}-choice${choiceIndex}`;
            radio.setAttribute('data-index', choiceIndex);
    
            // Progress bar
            const progressDiv = document.createElement('div');
            progressDiv.classList.add('progress');
            progressDiv.style.height = '2rem';
            const progressBar = document.createElement('div');
            progressBar.id = (`${radio.id}-progress`);
            progressBar.classList.add('progress-bar', 'bg-body-tertiary');
            progressBar.style.width = '100%';   // NOTE: Full bar to hide the progress
            // Set ARIA attributes
            progressDiv.setAttribute('role', 'progressbar');
            progressDiv.setAttribute('aria-valuemin', '0');
            progressDiv.setAttribute('aria-valuemax', '100');
            progressDiv.setAttribute('aria-valuenow', 'hidden');
    
            // Preselect first choice       // TODO: keep or scrap
            if (choiceIndex === 0) {
                radio.checked = true;
                progressBar.classList.replace('bg-body-tertiary', 'bg-secondary');
            } else {
                progressBar.classList.add('bg-body-tertiary');
            }
    
            // Change colour when selected
            this.form.addEventListener('click', () => {
                if (radio.checked === true) {
                    progressBar.classList.replace('bg-body-tertiary', 'bg-secondary');
                } else {
                    progressBar.classList.replace('bg-secondary', 'bg-body-tertiary');
                }
            }) 
    
            // Extend the click to whole progress bar
            progressBar.addEventListener('click', () => {
                radio.checked = true;
            })
    
            // Label
            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.style.position = 'absolute';
            label.style.marginLeft = '1rem';

            label.htmlFor =  radio.id;
            label.textContent = choice;
            
            progressBar.appendChild(label);
            progressDiv.appendChild(progressBar);
            newChoice.appendChild(radio);
            newChoice.appendChild(progressDiv);
            this.form.appendChild(newChoice);
            choiceIndex++;
        });
        div2.appendChild(this.form);
    
        // Footer
        const footer = document.createElement('div');
        footer.classList.add('card-footer', 'd-flex', 'justify-content-between');
        
        // Result button
        const resultBtn = document.createElement('button');
        resultBtn.classList.add('btn', 'btn-sm');
        resultBtn.type = 'button';
        resultBtn.id = `result-button-${this.id}`;
        resultBtn.textContent = 'Katso tulokset';
        footer.appendChild(resultBtn);

        // Vote button
        const voteBtn = document.createElement('button');
        voteBtn.classList.add('btn', 'btn-outline-light');
        voteBtn.type = 'button';
        voteBtn.id = `vote-button-${this.id}`;
        voteBtn.textContent = 'Äänestä';
        footer.appendChild(voteBtn);

        div1.appendChild(footer);
        pollContainer.appendChild(newCard);

        // Result button functionality
        resultBtn.addEventListener('click', (event) => {
            event.preventDefault();
    
            resultBtn.classList.add('invisible');
            voteBtn.classList.add('disabled', 'fst-italic');
            voteBtn.textContent = `Ääniä: ${this.totalVotes}`;

            this.showResults();
            console.log("SKIPPED VOTING");  // TODO: add confirmation
        })
    
        // Vote button functionality
        voteBtn.addEventListener('click', (event) => {
            event.preventDefault();
    
            // TODO: check this when loading page
            // this should be saved only to the user
            this.alreadyVoted = true;

            const selectedChoice = document.querySelector(`input[name=${this.pollName}]:checked`);
            this.vote(selectedChoice);
            
            resultBtn.classList.add('invisible');
            voteBtn.classList.add('disabled', 'fst-italic');
            voteBtn.textContent = `Ääniä: ${this.totalVotes}`;

            this.showResults();
        })
    }

    vote(choice) {
        const index = choice.getAttribute('data-index');
        this.totalVotes++;
        this.voteCounts[index]++;
        // Save to localStorage 
    }

    getPercentage(voteCount) {
        const float = (voteCount / this.totalVotes) * 100;
        return float.toFixed(1);
    }

    showResults() {
        const choices = this.form.children;
        for (const choice of choices) {
            const input = choice.childNodes[0];
            const progressDiv = choice.childNodes[1];
            const progressBar = progressDiv.childNodes[0];
            const label = progressBar.childNodes[0];
    
            // Highlight user's choice
            if (input.checked) {
                progressBar.classList.replace('bg-secondary', 'bg-success');
            }

            const index = input.getAttribute('data-index');
            const voteCount = this.voteCounts[index]

            const percentage = this.getPercentage(voteCount);
            label.innerHTML += `<br><b>${percentage}%</b> &nbsp;<i>(${voteCount})</i>`;
            progressBar.style.width = `${percentage}%`;
            progressDiv.style.height = '3rem';
            progressDiv.setAttribute('aria-valuenow', percentage);

            // Hide radio button
            input.classList.add('invisible');
        }
    }
}
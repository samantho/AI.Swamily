function swimDuck() {
    const duck = document.querySelector('.duck');
    const lanes = document.querySelectorAll('.lane');

    function getRandomLane() {
        return lanes[Math.floor(Math.random() * lanes.length)];
    }

    function setDuckLane(lane) {
        const laneTop = lane.getBoundingClientRect().top;
        duck.style.top = `${laneTop}px`;
        duck.style.animation = 'none'; // Reset animation
        void duck.offsetWidth; // Trigger reflow to restart animation
        duck.style.animation = 'swim 8s linear';
    }

    function startSwim() {
        const currentLane = getRandomLane();
        setDuckLane(currentLane);

        duck.addEventListener('animationend', function onAnimationEnd() {
            duck.removeEventListener('animationend', onAnimationEnd);
            setTimeout(startSwim, Math.random() * 3000 + 2000); // Random delay before swimming again
        });
    }

    startSwim();
}

swimDuck();

document.addEventListener('DOMContentLoaded', () => {
    const swimSetInput = document.getElementById('swimSetInput');
    const letterList = document.getElementById('letterList');
    const createButton = document.getElementById('createSwimSet');

    let swimSets = {};

    // Load swim sets from JSON file
    fetch('swimSets.json')
        .then(response => response.json())
        .then(data => {
            swimSets = data; // Store the swim sets in a variable

            // Function to update the swim sets based on input
            function updateSwimSets() {
                const inputValue = swimSetInput.value.toUpperCase(); // Convert input to uppercase
                letterList.innerHTML = ''; // Clear previous list
                
                Array.from(inputValue).forEach(letter => {
                    if (swimSets[letter]) {
                        const letterItem = document.createElement('div');
                        letterItem.className = 'letter-item';

                        const letterDiv = document.createElement('div');
                        letterDiv.className = 'letter';
                        letterDiv.textContent = letter;

                        const swimSetDiv = document.createElement('div');
                        swimSetDiv.className = 'hello';
                        // Get a random swim set that starts with the letter
                        const randomSet = swimSets[letter][Math.floor(Math.random() * swimSets[letter].length)];
                        // Remove the first letter of the swim set
                        swimSetDiv.textContent = randomSet.slice(1);

                        letterItem.appendChild(letterDiv);
                        letterItem.appendChild(swimSetDiv);
                        letterList.appendChild(letterItem);
                    }
                });
            }

            // Initial update on input
            swimSetInput.addEventListener('input', updateSwimSets);

            // Update when the create button is clicked
            createButton.addEventListener('click', updateSwimSets);
        })
        .catch(error => console.error('Error loading swim sets:', error));
});

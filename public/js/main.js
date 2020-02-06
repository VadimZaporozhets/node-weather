const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const messageContainer = document.getElementById('message');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`/weather?&address=${weatherInput.value}`)
        .then(response => response.json())
        .then((data) => {
            if (data.error) {
                messageContainer.textContent = data.error;
                return;
            }

            messageContainer.textContent = JSON.stringify(data);
        });
})
let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];

buttons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(button.value);
        display.textContent += button.value;
    });
});
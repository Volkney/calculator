let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let clear = document.getElementById('clearAll');


buttons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(button.value);
        display.textContent += button.value;
    });
});

clear.addEventListener('click', function(){
    display.textContent = '';
});
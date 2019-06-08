const checkboxDef = document.querySelector('.battle-info-defence').querySelectorAll("input[type='checkbox']"),
checkboxAtc = document.querySelector('.battle-info-attack').querySelectorAll("input[type='radio']"),
playerBody = document.querySelector('.char-player').querySelectorAll('.body-part'),
enemyBody = document.querySelector('.char-enemy').querySelectorAll('.body-part');

let checkboxDefListener = 0, // НУЖНО ОБНУЛЯТЬ КАЖДЫЙ ХОД
lastAttackIndex;


// ДЕЙСТВИЯ ЧЕКБОКСОВ В ЦЕНТРЕ (ЗАЩИТА)
checkboxDef.forEach((e, i) => {
e.addEventListener('click', (event) => {
    if (!e.checked) {
        checkboxDefListener--;
        playerBody[i].classList.toggle(playerBody[i].classList[0] + '_active');
    } else if (checkboxDefListener < 2 ) {
        checkboxDefListener++;
        playerBody[i].classList.toggle(playerBody[i].classList[0] + '_active');
    } else {
        e.checked = false;
        alert('Вы можете защищать только 2 области!');
    }
})
});

// ДЕЙСТВИЯ НА ПЕРСОНАЖА ИГРОКА (ЗАЩИТА)
playerBody.forEach((e, i) => {
e.addEventListener('click', () => {
    if (checkboxDef[i].checked) {
        e.classList.toggle(e.classList[0] + '_active');
        checkboxDef[i].checked = false;
        checkboxDefListener--;
    } else if (checkboxDefListener < 2 ) {
        e.classList.toggle(e.classList[0] + '_active');
        checkboxDefListener++;
        checkboxDef[i].checked = true;
    } else {
        alert('Вы можете защищать только 2 области!');
    }
})
})

// ДЕЙСТВИЯ НА РАДИО БАТТОНАХ (АТАКА)
checkboxAtc.forEach((e, i) => {
e.addEventListener('click', function (event) {
    if (Number.isInteger(lastAttackIndex)) {
        enemyBody[lastAttackIndex].classList.toggle(enemyBody[lastAttackIndex].classList[0] + '_active');
    } 
    lastAttackIndex = i;
    enemyBody[i].classList.toggle(enemyBody[i].classList[0] + '_active');
})
})

// ДЕЙСТВИЯ НА ПЕРСОНАЖА ПРОТИВНИКА (АТАКА)
enemyBody.forEach((e, i) => {
e.addEventListener('click', () => {
    if (Number.isInteger(lastAttackIndex)) {
        enemyBody[lastAttackIndex].classList.toggle(enemyBody[lastAttackIndex].classList[0] + '_active');
    } 
    e.classList.toggle(e.classList[0] + '_active');
    checkboxAtc[i].checked = true;
    lastAttackIndex = i;
})
}) 
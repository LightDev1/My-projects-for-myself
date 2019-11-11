const start = document.querySelector('.start__list'),
    writeTask = document.getElementById('write__task'),
    enter = document.getElementById('sent'),
    deleteTasks = document.querySelector('.todo__del'),
    working = document.querySelector('.working'),
    finisheds = document.querySelector('.completes');
  


const addTask = (event) => {
    
    let li = document.createElement('li');
    li.classList.add('task');
    li.innerHTML = writeTask.value;
    if (writeTask.value == '') {
        return;
    }
    working.appendChild(li);
    writeTask.value = '';

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('check');
    li.insertAdjacentElement('beforeend', check);

    let del = document.createElement('span');
    del.classList.add('del');
    del.innerHTML = '×';
    li.insertAdjacentElement('beforeend', del);

    del.addEventListener('click', () => {
        li.remove();
    });

    check.addEventListener('click', () => {
        finisheds.appendChild(li);
        li.classList.toggle('checked');
        if(!(li.classList.contains('checked'))) {
            working.appendChild(li);
        }
    });

}


enter.addEventListener('click', addTask);

start.addEventListener('click', () => {
    working.innerHTML = '';
});

deleteTasks.addEventListener('click', () => {
    finisheds.innerHTML = '';
});

writeTask.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
        addTask();
    }
});


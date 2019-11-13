const start = document.querySelector('.start__list'),
    writeTask = document.getElementById('write__task'),
    enter = document.getElementById('sent'),
    deleteTasks = document.querySelector('.todo__del'),
    working = document.querySelector('.working'),
    finisheds = document.querySelector('.completes');
  
let notReady = [];
let ready = [];


let li = document.createElement('li');
    li.classList.add('task');
    li.innerHTML = 'fdfddfdf';
    working.appendChild(li);


const createList = () => {

    if (writeTask.value == '') {
        return;
    }

    let listItem = writeTask.value;
    notReady.push(listItem);
    ready.push(listItem);
    
    console.log(ready);
    let result = notReady.join();
    let date = new Date(Date.now() + 86400e3);
    
    setCookie('dataList', result, {expires: date});
    
};

const addTask = (event) => {

    if (writeTask.value == '') {
        return;
    }

    createList();

    data = getCookie('dataList');
    console.log(data);
    
    dataArray = data.split(',');
    console.log(dataArray);

    dataArray.forEach(item => {

    let li = document.createElement('li');
    li.classList.add('task');
    li.innerHTML = item;
    working.appendChild(li);

    addCheck(li);
    addDel(li);

});

    notReady = [];
    
    writeTask.value = '';
}

const addCheck = (li) => {
    let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('check');
    li.insertAdjacentElement('beforeend', check);

    check.addEventListener('click', () => {
        finisheds.appendChild(li);
        li.classList.toggle('checked');
        if(!(li.classList.contains('checked'))) {
            working.appendChild(li);
        }
    });
}

const addDel = (li) => {
    let del = document.createElement('span');
    del.classList.add('del');
    del.innerHTML = '×';
    li.insertAdjacentElement('beforeend', del);

    del.addEventListener('click', () => {
        li.remove();
    });
}


    
   



enter.addEventListener('click', () => {
    addTask();
});

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



function caching() {

    if (writeTask.value == '') {
        return;
    }

    let ourCache = ready.join();
    let date = new Date(Date.now() + 86400e3);
    
    setCookie('newDataList', ourCache, {expires: date});

    let newList = getCookie('dataList');

    let listArray = newList.split(',');

    listArray.forEach(item => {
        let li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = item;
        working.appendChild(li);
        });
}

caching();


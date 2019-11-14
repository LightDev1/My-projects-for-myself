const start = document.querySelector('.start__list'),
    writeTask = document.getElementById('write__task'),
    enter = document.getElementById('sent'),
    deleteTasks = document.querySelector('.todo__del'),
    working = document.querySelector('.working'),
    finisheds = document.querySelector('.completes'),
    saveButton = document.querySelector('.save');
   
    
  
let notReady = [];
let ready = [];

function caching() {


    let newList = getCookie('UlJson');

    console.log(newList);

    strList = JSON.parse(newList);
    console.log(strList);

    working.insertAdjacentHTML('afterbegin', strList);

    const allLi = document.querySelectorAll('.task');
    console.log(allLi);

    for (let li of allLi) {

        let check = li.querySelector('.check');

        check.addEventListener('click', () => {
            finisheds.appendChild(li);
            li.classList.toggle('checked');
            if(!(li.classList.contains('checked'))) {
                working.appendChild(li);
            }
        });

        let del = li.querySelector('.del');
        console.log(del);
        del.addEventListener('click', () => {
            li.remove();
        });

    }

    let newUlList = getCookie('UlTrueJson');

    strUlList = JSON.parse(newUlList);

    finisheds.insertAdjacentHTML('afterbegin', strUlList);

    const checkeds = document.querySelectorAll('.checked');

    for (let li of checkeds) {

        let check = li.querySelector('.check');

        check.addEventListener('click', () => {
            finisheds.appendChild(li);
            li.classList.toggle('checked');
            if(!(li.classList.contains('checked'))) {
                working.appendChild(li);
            }
        });

        let del = li.querySelector('.del');
        console.log(del);
        del.addEventListener('click', () => {
            li.remove();
        });

    }

}




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

    let ourCache = ready.join();

    let Newdate = new Date(Date.now() + 86400e3);
    
    setCookie('newDataList', ourCache, {expires: Newdate});
    
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


    
const deleteAll = () => {
    finisheds.innerHTML = '';
}



enter.addEventListener('click', () => {
    addTask();
});

start.addEventListener('click', () => {
    working.innerHTML = '';
});

deleteTasks.addEventListener('click', deleteAll);

writeTask.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
        addTask();
    }
});



caching();


const saveList = () => {
    //Список не завершенных
    let list = working.innerHTML;
    listStr = JSON.stringify(list);
    
    let date = new Date(Date.now() + 86400e5);
    setCookie('UlJson', listStr, {expires: date});

    //Список завершенных
    let ulList = finisheds.innerHTML;
    ulStr = JSON.stringify(ulList);
    
    let dateUl = new Date(Date.now() + 86400e5);
    setCookie('UlTrueJson', ulStr, {expires: date});
}



saveButton.addEventListener('click', saveList);


function sortable(rootEl, onUpdate){
    var dragEl;
    
    // Делаем всех детей перетаскиваемыми
    [].slice.call(rootEl.children).forEach(function (itemEl){
        itemEl.draggable = true;
    });
    
    // Фнукция отвечающая за сортировку
    function _onDragOver(evt){
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
       
        var target = evt.target;
        if( target && target !== dragEl && target.nodeName == 'LI' ){
            // Сортируем
            rootEl.insertBefore(dragEl, target.nextSibling || target);
        }
    }
    
    // Окончание сортировки
    function _onDragEnd(evt){
        evt.preventDefault();
       
        dragEl.classList.remove('ghost');
        rootEl.removeEventListener('dragover', _onDragOver, false);
        rootEl.removeEventListener('dragend', _onDragEnd, false);

        // Сообщаем об окончании сортировки
        onUpdate(dragEl);
    }
    
    // Начало сортировки
    rootEl.addEventListener('dragstart', function (evt){
        dragEl = evt.target; // Запоминаем элемент который будет перемещать
        
        // Ограничиваем тип перетаскивания
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);

        // Пописываемся на события при dnd
        rootEl.addEventListener('dragover', _onDragOver, false);
        rootEl.addEventListener('dragend', _onDragEnd, false);

        setTimeout(function (){
            // Если выполнить данное действие без setTimeout, то
            // перетаскиваемый объект, будет иметь этот класс.
            dragEl.classList.add('ghost');
        }, 0)
    }, false);
}
                        
// Используем                    
sortable( working, function (item){
    console.log(item);
});
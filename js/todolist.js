let savedTasks = [];
const defaultTasks = [
    "Drink 3 L. of Water",
    "Do Homework",
    "Do Coding Exercise Atleast 3 Hours Everyday",
    "Cook Meal",
    "Read a Book"
];
const taskList = document.querySelector("#list");
const taskInput = document.querySelector("#task");

const closeIcon = `<span class="close" onclick="deleteTask(this.parentNode)" aria-label="Close" aria-hidden="true">&times;</span>`;

// İlk açılışta veya hiç yapılacak iş bırakılmadığında varsayılan görevleri ekleme
if (localStorage.getItem('savedTasks') === null || localStorage.getItem('savedTasks').length === 2) {
    defaultTasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${task}${closeIcon}`;
        listItem.addEventListener("click", toggleTask);
        savedTasks.push(listItem.innerHTML);
        taskList.append(listItem);
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    });
}
// Eğer Local Storage dolu ise kayıtlı görevleri yükleme
else {
    savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
    savedTasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${task}`;
        listItem.addEventListener("click", toggleTask);
        taskList.append(listItem);
    });
}

// Tıklanan görevin işaretlenmesini değiştirme fonksiyonu
function toggleTask() {
    this.classList.toggle("checked");
}

// Yeni görev ekleme fonksiyonu
function addTask() {
    // Boş görev veya boş karakter eklenmesini engelleme
    if (taskInput.value.length > 0 && !(taskInput.value.trim().length === 0)) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${taskInput.value}${closeIcon}`;
        listItem.addEventListener("click", toggleTask);
        taskList.append(listItem);
        savedTasks.push(listItem.innerHTML);
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
        $('.success').toast('show');
        taskInput.value = "";
    } else {
        $('.error').toast('show');
        taskInput.value = "";
    }
}

// Kayıtlı görevi silme fonksiyonu
function deleteTask(parentNode) {
    savedTasks.splice(savedTasks.indexOf(parentNode.innerHTML), 1);
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    parentNode.remove();
}
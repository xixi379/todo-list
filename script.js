// const text =document.querySelector(".text");
// const list =document.querySelector(".list");
// const add =document.querySelector(".add");


// function newTask(){
//     if (text.value === "") {
//         return;
//     }
//     const task =document.createElement("li");
//     task.innerHTML = `
//         <input type="checkbox" class="tick">
//         <label>${text.value}</label>
//         <button class="bin">X</button>

      
//     `

//     const bin=task.querySelector(".bin");
//     const tick=task.querySelector(".tick");

//     bin.addEventListener("click",function(){
//         task.remove();
//     });

//     tick.addEventListener("change",function(){
//         if (tick.checked) {
//             task.style.textDecoration="line-through";
//             task.style.color="#999";
//             list.append(task)
//         }else{
//             task.style.textDecoration="none";
//             task.style.color="";
//             list.prepend(task)
//         }
//     });

   



//     list.append(task);
//     text.value = "";

// }

// add.addEventListener("click",newTask);

// text.addEventListener("keyup",function(e){
//     if  (e.key === "Enter") { 
//        newTask();
//     }
// });      
    
    







const text = document.querySelector(".text");
const list = document.querySelector(".list");
const add = document.querySelector(".add");

// 加载已保存的任务列表
document.addEventListener("DOMContentLoaded", loadTasks);

// 创建新任务
function newTask() {
    if (text.value === "") {
        return;
    }

    const task = createTaskElement(text.value);
    list.append(task);
    saveTasks();  // 保存任务列表
    text.value = "";
}

// 创建任务元素
function createTaskElement(taskContent) {
    const task = document.createElement("li");
    task.innerHTML = `
        <input type="checkbox" class="tick">
        <label>${taskContent}</label>
        <button class="bin">X</button>
    `;

    const bin = task.querySelector(".bin");
    const tick = task.querySelector(".tick");

    bin.addEventListener("click", function () {
        task.remove();
        saveTasks();  // 保存任务列表
    });

    tick.addEventListener("change", function () {
        if (tick.checked) {
            task.style.textDecoration = "line-through";
            task.style.color = "#999";
        } else {
            task.style.textDecoration = "none";
            task.style.color = "";
        }
        saveTasks();  // 保存任务列表
    });

    return task;
}

// 保存任务到 LocalStorage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll("li").forEach(task => {
        const taskContent = task.querySelector("label").textContent;
        const taskCompleted = task.querySelector(".tick").checked;
        tasks.push({ content: taskContent, completed: taskCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 加载任务从 LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskData => {
        const task = createTaskElement(taskData.content);
        if (taskData.completed) {
            const tick = task.querySelector(".tick");
            tick.checked = true;
            task.style.textDecoration = "line-through";
            task.style.color = "#999";
        }
        list.append(task);
    });
}

add.addEventListener("click", newTask);

text.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        newTask();
    }
});

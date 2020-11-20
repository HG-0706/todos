import {ref, computed} from "vue"
let originTitle = null;

export default function useEditTodo(todoRef){
    const editingTodoRef = ref(null);
    const editTodo = (todo)=>{
        originTitle = todo.title;
        editingTodoRef.value = todo;
    }

    const editDone = (todo)=>{
        editingTodoRef.value = null;
        const title = todo.title.trim();
        if(title){
            todo.title = title;
        }else{
            todoRef.value.splice(todoRef.value.indexOf(todo),1)
        }
    }

    const editCancel = (todo)=>{
        editingTodoRef.value = null;
        todo.title = originTitle;
    }

    const allDoneRef = computed({
        get(){
            return todoRef.value.filter(it=>!it.completed).length === 0;
        },
        set(checked){
            todoRef.value.forEach(it=>{
                it.completed = checked;
            })
        }
    })

    return {
        editingTodoRef,
        editTodo,
        editDone,
        editCancel,
        allDoneRef,
    }
}
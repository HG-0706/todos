import {filter} from "../utils/todoStorage"

export default function useDelTodo(todoRef){
    const todoDel = (todo)=>{
        todoRef.value.splice(todoRef.value.indexOf(todo),1)
    }

    const todoDelAllComplete = ()=>{
        todoRef.value = filter(todoRef.value,'active')
    }
    return {
        todoDel,
        todoDelAllComplete,
    }
}
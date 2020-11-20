import {ref} from 'vue'
import { randomId } from '../utils/todoStorage'

export default function useNewtodo(todoRef){
    const newTodoRef = ref("");//新任务标题
    const addTodo = ()=>{
        //新增一个任务
        const value = newTodoRef.value && newTodoRef.value.trim();
        if(!value){
            return;
        }
        const todo = {
            title:value,
            completed:false,
            id:randomId(),
        }
        todoRef.value.push(todo);
        newTodoRef.value = "";
    }
    return {
        newTodoRef,
        addTodo,
    }
}
import { ref, onMounted,computed } from 'vue'
import { filter } from '../utils/todoStorage';

const validHash = ['all','active','completed']

export default function useFilter(todoRef){
    const showRef = ref('all');

    const onHashChange = ()=>{
        const hash = location.hash.replace(/#\/?/,"");
        if(validHash.includes(hash)){
            //有效的
            showRef.value = hash;
        }
        else{
            //无效的
            location.hash = "";
            showRef.value = "all"
        }
    };
    onMounted(()=>{
        window.addEventListener('hashchange',onHashChange)
    });

    const filterTodosRef = computed(()=>{
        return filter(todoRef.value,showRef.value)
    })

    const uncompletedTodo = computed(()=>{
        return filter(todoRef.value,'active').length;
    })

    const completedTodo = computed(()=>{
        return filter(todoRef.value,'completed').length;
    })

    return {
        showRef,
        filterTodosRef,
        uncompletedTodo,
        completedTodo,
    };
}
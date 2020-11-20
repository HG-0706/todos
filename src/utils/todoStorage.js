const LOCAL_KEY = 'todoApp';


/**
 * 获取所有任务
 */
export function fetch(){
    const result = localStorage.getItem(LOCAL_KEY);
    if(result){
        return JSON.parse(result);
    }
    return [];
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export function save(todos){
    localStorage.setItem(LOCAL_KEY,JSON.stringify(todos));
}

/**
 * 产生随机id
 */
export function randomId(){
    return new Date().getTime() + Math.random().toString(16).substr(2,4);
}


/**
 * 通过hash值过滤任务列表
 */

 export function filter(todos,show='all'){
    if(show === 'all'){
        return todos;
    }
    else if(show === 'active'){
        return todos.filter(it=>!it.completed)
    }
    else if(show === 'completed'){
        return todos.filter(it=>it.completed)
    }
    throw new Error('invalid show value');
 }
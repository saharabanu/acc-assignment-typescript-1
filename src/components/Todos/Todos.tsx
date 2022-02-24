import React, { useCallback, useEffect, useReducer, useRef } from 'react';

interface Todo {
    id:number,
    text:string,
    required?:boolean
}
type ActionType = {
    type:"ADD";
    text:string
   
} | {
    type:"REMOVE";
    id:number
}





const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, [])
    // (state)=> {
    //     const persistedData = localStorage.getItem('lists')
    //     const todos = persistedData ? JSON.parse(persistedData) : []
    //     return { ...state, todos }});

    function reducer(state:Todo[],action:ActionType){
        switch(action.type){
            case"ADD":
            return[...state,
            {
                id:state.length,
                text:action.text
            },
        ];
        case "REMOVE":
        return state.filter(({id})=>id !== action.id)

        }
       

    }
    const newTodoRef = useRef<HTMLInputElement>(null);



    const onAddTodo = useCallback(()=>{
        if(newTodoRef.current){
            dispatch({
                type:"ADD",
                text:newTodoRef.current.value
            })
            newTodoRef.current.value="";
        }

    },[])

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(todos));
      }, [todos]);
   

    
    return (
        <div>

            <input type="text" placeholder='Write some text' ref={newTodoRef}className=" text-left outline-none  border my-10  py-3 px-4 w-6/12"/>
            <button onClick={onAddTodo} className="bg-orange-500 px-6 py-3 text-white ml-5 uppercase text-lg">Add</button>

            <div className='container mx-auto grid lg:grid-cols-3 gap-4 '>
            {
                todos.map((todo)=>(
                    <div key={todo.id}className="h-40 border bg-gray-100 rounded-md shadow-lg text-left  p-4 ">
                            <div className=''>
                            <div>
                            <h2 className='pb-10 text-xl' >{todo.text}</h2>
                            </div>
                            <div>
                            <button onClick={()=> dispatch({type: 'REMOVE', id: todo.id})} className=" bg-red-500  px-6 py-2 text-white uppercase text-lg">Remove</button>
                            </div>
                            </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default Todos;

import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from './Todo';
import TodoLoader from "./ui/TodoLoder";
import Error from "./ui/Error";
export default function TodoList (){
    const { data: todos, isLoading, isError } = useGetTodosQuery();

    let content = null;

    if (isLoading) {
        content = (
            <>
                <TodoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && todos?.length === 0) {
        content = <Error message="No Todo found!" />;
    }

    if (!isLoading && !isError && todos?.length > 0) {
        content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
    }

    
    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px]" >
           {content}  
        </div>
    );
}
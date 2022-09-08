
import noteImage from "../assets/images/notes.png";
import doubleImage from "../assets/images/double-tick.png";
import plusImage from "../assets/images/plus.png";
import { useState } from "react";
import Success from "./ui/Success";
import Error from "./ui/Error";
import {useAddTodoMutation} from '../features/api/apiSlice';
export default function Header (){
    const [addTodo, { isLoading, isSuccess, isError }] = useAddTodoMutation();
    const [text, setText] = useState("");
    const resetForm = () => {
        setText("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            text,
            completed: false,
        });
        resetForm();
    };
    return (
                <div>

                    <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 px-4 py-4 rounded-md">
                        <img src={noteImage} className="w-6 h-6" alt="Add todo"
                        />
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your todo"
                            className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                        />
                        <button  disabled={isLoading} type="submit" className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}></button>
                       
                    </form>

                <div>
                {isError && (
                   <Error message="There was an error adding video!" />
                  )}
                </div>
                    <ul className="flex justify-between my-4 text-xs text-gray-500">
                        <li className="flex space-x-1 cursor-pointer">
                            <img
                                className="w-4 h-4"
                                src={doubleImage}
                                alt="Complete"
                            />
                            <span>Complete All Tasks</span>
                        </li>
                        <li className="cursor-pointer">Clear completed</li>
                    </ul>
                </div>
    );
}
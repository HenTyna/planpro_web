import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import taskIcon from '@/assets/task-icon.png'; // Adjust path
import { formatDateCard } from '@/utils/dateformat';

const Cards = ({ todo }: { todo: any }) => (
    <div className="bg-white rounded-xl shadow p-4 mt-4 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-gray-800">{todo.title}</h2>

        {todo.image && (
            <img
                src={todo.image}
                alt={todo.title}
                className="rounded-lg w-full h-32 object-cover"
            />
        )}

        <div className="text-gray-600 text-sm flex items-center gap-2 mt-1">
            <CalendarDays width={16} /> {formatDateCard(todo.createdAt)}
        </div>

        <p className="text-gray-700 text-sm">{todo.content}</p>

        <div className="mt-2 flex justify-between items-center">
            <span className="px-2 py-1 text-xs font-semibold bg-purple-500 text-white rounded-full">
                {todo.property}
            </span>
            <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a4 4 0 118 0 4 4 0 01-8 0z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
);

export default Cards;
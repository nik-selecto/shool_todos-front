import { useState } from 'react';

export function Todo({ title: _title, is_complete: _is_complete }: { title: string, is_complete: boolean }) {
    console.log(_title);
    const [title, setTitle] = useState(_title);
    const [isComplete, setIsComplete] = useState(_is_complete);



    return <li>
        <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
            {title}
        </span>
        <span>
            <button onClick={() => alert('This functionality is not implemented yet')}>Complete</button>
        </span>
    </li>
}
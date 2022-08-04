import { useState } from 'react';
import { CommonData } from './types';
import { makeRequest } from './utils';

export function Todo({
    todo: { title: _title, is_complete: _is_complete, id },
    setLastReq,
    setLastRes,
    setLogs,
}: CommonData & {
    todo: { title: string, is_complete: boolean, id: number },
}) {
    console.log(_title);
    const [title, setTitle] = useState(_title);
    const [isComplete, setIsComplete] = useState(_is_complete);



    return <li key={id}>
        <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
            {title}
        </span>
        <span>
            <button onClick={() => {
                const oldComplete = isComplete;
                setIsComplete(!isComplete);
                makeRequest({
                    method: 'put',
                    endpoint: `/todos/${id}`,
                    body: {
                        is_complete: !isComplete
                    }
                }, { setLastReq, setLastRes })
                    .then(({ data: { id, is_complete } }) => {
                        if (!id) {
                            alert('Server is not answered...');
                            setIsComplete(oldComplete);
                            return setLogs(JSON.stringify({
                                error: 'Incorrect response',
                                correctExample: {
                                    id: 1,
                                    is_complete: true,
                                }
                            }));
                        }
                    });
            }}>Complete</button>
        </span>
    </li>
}
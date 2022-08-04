import { useState } from 'react';
import { CommonData, TodoType } from './types';
import { makeRequest } from './utils';

export function Todo({
    todo: { title: _title, is_complete: _is_complete, id },
    setLastReq,
    setLastRes,
    setLogs,
    rmTodo,
    setTodos,
}: CommonData & {
    todo: TodoType,
    rmTodo: (todoId: number) => TodoType[],
    setTodos: (todos: TodoType[]) => void,
}) {
    console.log(_title);
    const [title, setTitle] = useState(_title);
    const [isComplete, setIsComplete] = useState(_is_complete);



    return <li key={id}>
        <span key={'title'} style={{
            textDecoration: isComplete ? 'line-through' : 'none',
            fontSize: isComplete ? 'inherit': '175%',
            }}>
            {title}
        </span>
        <span key={'completeButton'}>
            <button style={{
                backgroundColor: isComplete ? 'orange' : 'green',
                color: 'white',
            }} onClick={() => {
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
            }}>{isComplete ? 'Reset' : 'Complete'}</button>
        </span>
        <span key={'deleteButton'}>
            <button style={{
                color: 'white',
                backgroundColor: 'red',
            }} onClick={() => {
                const oldTodos = rmTodo(id);

                makeRequest({
                    method: 'delete',
                    endpoint: `/todos/${id}`,
                }, {
                    setLastReq,
                    setLastRes,
                }).then(({ status }) => {
                    if (status === 204) return;

                    alert('Server is not answered...');
                    setTodos(oldTodos);
                    setLogs(JSON.stringify({
                        error: 'Incorrect response',
                        tip: 'On success delete you should set response\' [status] property to [204]',
                    }, null, 4));
                });
            }}>Delete</button>
        </span>
    </li>
}
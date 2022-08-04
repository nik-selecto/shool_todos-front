import { useEffect, useState } from 'react';
import { Todo } from './Todo';
import { CommonData } from './types';
import { makeRequest } from './utils';

export function Todos(common: CommonData) {
    const { user, setLastReq, setLastRes, setLogs } = common;
    const [todos, setTodos] = useState<{ title: string, is_complete: boolean, id: number }[]>([]);
    const [askTodos, setAskTodos] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await makeRequest({
                endpoint: `/users/${user!.id}/todos`,
                method: 'get',
            }, {
                setLastReq,
                setLastRes,
            });

            setTodos(data);
        })();
    }, [askTodos]);

    return <div>
        <ul>
            {todos.map((t, i) => <Todo {...{ ...{ ...common, todo: t}, key: i }} />)}
        </ul>
        <form onSubmit={(event: any) => {
            event.preventDefault();

            const { title: { value: title } } = event.target;

            makeRequest({
                method: 'post',
                endpoint: `/users/${user!.id}/todos`,
                body: {
                    title,
                }
            }, { setLastReq, setLastRes })
                .then(({ data: { title, id, is_complete } }: any) => {
                    if (!id) {
                        setLogs(JSON.stringify({
                            error: 'Incorrect response structure',
                            correctExample: {
                                id: 1,
                                title: 'Make todo response like this',
                                is_complete: false,
                            },
                        }));
                    }

                    setTodos([...todos, { title, is_complete, id }]);
                });
        }}>
            <label>Add new task:</label>
            <input type={'text'} name={'title'} />
            <input type={'submit'} />
        </form>
    </div>;
}
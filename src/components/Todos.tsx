import { useEffect, useState } from 'react';
import { Todo } from './Todo';
import { CommonData } from './types';
import { makeRequest } from './utils';

export function Todos({ user, setLastReq, setLastRes, setLogs }: CommonData) {
    const [todos, setTodos] = useState<{ title: string, is_complete: boolean }[]>([]);
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
            {todos.map((t, i) => <Todo {...{ ...t, key: i }} />)}
        </ul>
        <hr />
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
                        setLogs('Something wrong in response');
                    }

                    alert(JSON.stringify({ todos, title, is_complete}, null, 4))

                    setTodos([...todos, { title, is_complete }]);
                });
        }}>
            <label>Add new task:</label>
            <input type={'text'} name={'title'} />
            <input type={'submit'} />
        </form>
    </div>;
}
import { useEffect, useState } from 'react';
import { CommonData } from './types';
import { LOCALHOST } from './constants';
import { makeRequest } from './utils';

export function Login({ setLastReq, setLastRes, setUser, setLogs }: CommonData) {
    let [sendReq, setSendReq] = useState(false);
    let [payload, setPayload] = useState({});

    useEffect(() => {
        if (!sendReq) return;

        (async () => {
            const method = 'post';
            const url = LOCALHOST;
            const body = payload;

            setLastReq({ url, method, body });
            const { data } = await makeRequest({
                method: 'post',
                endpoint: '/login',
                body: payload,
            }, { setLastReq, setLastRes });

            if (data?.name && data?.email && data?.id) {
                setUser(data);
            } else {
                setLogs('You missed something in response...');
            }
        })();
    }, [sendReq])
    return <div>
        <h1>Login</h1>
        <form onSubmit={(event: any) => {
            event.preventDefault();

            const { email: { value: email },
                password: { value: password } } = event.target;

            if (email && password) {
                setPayload({ email, password });
                setSendReq(true);
            }
        }}>
            <input type={'text'} name={'email'} placeholder={'email'} />
            <input type={'password'} name={'password'} placeholder={'password'} />
            <input type={'submit'} value={'Login'} />
        </form>
    </div>
}

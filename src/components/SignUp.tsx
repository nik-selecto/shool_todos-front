import { useEffect, useState } from 'react'
import { CommonData } from './types';
import { makeRequest } from './utils';
import { useNavigate } from 'react-router-dom';

export function SignUp({ setLastReq, setLastRes, setUser, setLogs }: CommonData) {
    const initSendReq = {};
    const navigate = useNavigate();
    let [sendReq, setSendReq] = useState(initSendReq);
    let [payload, setPayload] = useState({});

    useEffect(() => {
        if (sendReq === initSendReq) return;

        (async () => {
            const { data } = await makeRequest({
                method: 'post',
                endpoint: '/sign-up',
                body: payload,
            }, {
                setLastReq,
                setLastRes,
            });

            if (data?.name && data?.email && data?.id) {
                navigate({ pathname: '/login' }, { replace: false });
            } else {
                setLogs('You missed something in response...');
            }
        })();
    }, [sendReq])
    return <div>
        <h1>Sign Up</h1>
        <form onSubmit={(event: any) => {
            event.preventDefault();

            const { name: { value: name },
                email: { value: email },
                password: { value: password } } = event.target;

            if (name && email && password) {
                setPayload({ name, email, password });
                setSendReq({});
            }
        }}>
            <input type={'text'} name={'name'} placeholder={'name'} />
            <input type={'text'} name={'email'} placeholder={'email'} />
            <input type={'password'} name={'password'} placeholder={'password'} />
            <input type={'submit'} value={'Sign Up'} />
        </form>
    </div>
}

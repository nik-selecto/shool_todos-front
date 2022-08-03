import { useEffect, useState } from 'react';
import axios from 'axios';

export function Login() {
    let [sendReq, setSendReq] = useState(false);
    let [payload, setPayload] = useState({});

    useEffect(() => {
        if (!sendReq) return;

        (async () => {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:4000/login',
                data: payload,
            });
        })();
    })
    return <div>
        <h1>Sign Up</h1>
        <hr />
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

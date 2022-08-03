import { useEffect, useState } from 'react'
import axios from 'axios';

export function SignUp() {
    let [sendReq, setSendReq] = useState(false);
    let [payload, setPayload] = useState({});

    useEffect(() => {
        if (!sendReq) return;

        (async () => {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:4000/sign-up',
                data: payload,
            });
        })();
    })
    return <div>
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={(event: any) => {
            event.preventDefault();

            const { name: { value: name },
                email: { value: email },
                password: { value: password } } = event.target;

            if (name && email && password) {
                setPayload({ name, email, password });
                setSendReq(true);
            }
        }}>
            <input type={'text'} name={'name'} placeholder={'name'} />
            <input type={'text'} name={'email'} placeholder={'email'} />
            <input type={'password'} name={'password'} placeholder={'password'} />
            <input type={'submit'} value={'Sign Up'} />
        </form>
    </div>
}

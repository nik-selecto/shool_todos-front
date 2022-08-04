import { Link } from 'react-router-dom';
import { Todos } from './Todos';
import { CommonData } from './types';

export function Home({ user, ...rest }: CommonData) {
    return <div>
        <h1>Home</h1>
        {user && <div>
            <h2>Your todo list:</h2>
            <Todos {...{ user, ...rest }} />
        </div>}
        <ul>
            {
                [
                    ...(!user
                        ? [
                            <Link to={'/login'}>Login</Link>,
                            <Link to={'/sign-up'}>Sign Up</Link>
                        ]
                        : [
                        ]),
                ]
                    .map((l, i) => <li key={i}><h4>{l}</h4></li>)
            }
        </ul>
    </div>;
}

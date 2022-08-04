import { Link } from 'react-router-dom';
import { Todos } from './Todos';
import { CommonData } from './types';

export function Home({ user, ...rest }: CommonData) {
    return <div>
        <h1>Home</h1>
        <hr />
        <ul>
            {
                [
                    ...(!user
                        ? [
                        <Link to={'/login'}>Login</Link>,
                        <Link to={'/sign-up'}>Sign Up</Link>
                        ]
                        : [
                        <Todos {...{ user, ...rest }}/>
                        ]),
                ]
                    .map((l, i) => <li><h4 key={i}>{l}</h4></li>)
            }
        </ul>
    </div>;
}

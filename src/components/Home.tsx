import { Link } from 'react-router-dom';
import { CommonData } from './types';

export function Home({ user }: CommonData) {
    return <div>
        <h1>Home</h1>
        <hr />
        <ul>
            {
                [
                    ...(!user
                        ? [<Link to={'/login'}>Login</Link>, <Link to={'/sign-up'}>Sign Up</Link>]
                        : [])
                ]
                    .map((l, i) => <h4 key={i}>{l}</h4>)
            }
        </ul>
    </div>;
}

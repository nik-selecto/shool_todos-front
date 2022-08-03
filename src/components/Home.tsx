import { Link } from 'react-router-dom';

export function Home() {
    return <div>
        <h1>Home</h1>
        <hr />
        <ul>
            <h4>
                <li>
                    <Link to={'/sign-up'}>Sign Up</Link>
                </li>
            </h4>
            <h4>
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
            </h4>
        </ul>
    </div>;
}

import { CommonData } from './types';

export function Logout({ setUser }: CommonData) {
    return <div>
        <button onClick={() => {
            setUser(null);
        }}>Logout</button>
    </div>
}

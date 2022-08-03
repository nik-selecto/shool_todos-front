export function Logger({ logs }: { logs: string[] }) {
    return <div>
        <label>Logs:</label>
        <ul>
            {
                logs.map((l, i) => {
                    return <li key={i}>{l}</li>;
                })
            }
        </ul>
    </div>
}
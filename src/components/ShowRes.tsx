export function ShowRes({ res }: { res: any }) {
    return <div>
        <label>Last response from server:</label>
        <pre>{JSON.stringify(res, null, 4)}</pre>
    </div>
}
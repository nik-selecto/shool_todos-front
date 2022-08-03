export function ShowReq({ req }: { req: any }) {
    return <div>
        <label>Your last request:</label>
        <pre>{ JSON.stringify(req, null, 4) }</pre>
    </div>
}

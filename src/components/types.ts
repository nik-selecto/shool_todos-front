export type User = {
    id: string,
    email: string,
    name: string,
    background_color: string,
};

export type CommonData = {
    setLastReq: (data: Record<string, any>) => void,
    setLastRes: (data: Record<string, any>) => void,
    setUser: (data: User | null) => void,
    setLogs: (data: string) => void,
    user: User | null,
};

export type TodoType = { title: string, is_complete: boolean, id: number };

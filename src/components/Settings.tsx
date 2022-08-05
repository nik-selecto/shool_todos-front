import { CommonData } from './types';
import { BlockPicker } from 'react-color';
import { makeRequest } from './utils';

export function Settings(data: CommonData & {
    background: string,
    setBackground: (color: string) => void,
}) {
    const { background, setBackground, user, setLastReq, setLastRes, setLogs } = data;
    return <div>
        <h1>Settings</h1>
        <label>Change background color:</label>
        <BlockPicker color={background} onChange={(color) => {
            const oldColor = background;

            setBackground(color.hex)

            setTimeout(() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('Do you want to save this color?')) {
                    makeRequest({
                        method: 'get',
                        endpoint: `/users/${user!.id}/settings`,
                        query: { background: color.hex },
                    }, {
                        setLastReq,
                        setLastRes,
                    }).then(({ data: { id } }: any) => {
                        if (!id) {
                            setBackground(oldColor);
                            setLogs(JSON.stringify({
                                error: 'Incorrect response',
                                correctExample: {
                                    id: 1,
                                },
                            }))
                        }
                    })
                } else {
                    setBackground(oldColor);
                }
            }, 500);
        }
        } />
    </div>
}
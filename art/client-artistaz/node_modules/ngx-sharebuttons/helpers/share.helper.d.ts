import { ShareArgs } from './share-buttons.class';
import { ShareProvider } from './share-provider.enum';
/** Here is a collection of helper functions that can be used statically */
export declare module Helper {
    /** Prepare gPlus count request body   */
    const gplusCountBody: (url: any) => {
        method: string;
        id: string;
        params: {
            nolog: boolean;
            id: string;
            source: string;
            userId: string;
            groupId: string;
        };
        jsonrpc: string;
        key: string;
        apiVersion: string;
    }[];
    /** Create share links */
    const shareFactory: (type: ShareProvider, args: ShareArgs) => string;
    /** Change share counts to a readable number e.g 35.6k */
    const nFormatter: (num: number, digits: number) => string;
    const getEnumValue: <T>(value: string | number, enumeration: T) => number;
}

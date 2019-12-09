/// <reference types="react" />
import { IMap } from '../types';
export declare class RecycleManager {
    private stableKeySource;
    private freeKeysPool;
    private usedKeysOriginalToStable;
    freeUnusedKeys(nextOriginalKeys: IMap<boolean>): void;
    getStableKey(originalKey: React.Key): React.Key;
    private getNextKeyFromPool;
    private freeUnusedKey;
}

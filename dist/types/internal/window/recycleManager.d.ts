/// <reference types="react" />
export declare class RecycleManager {
    private stableKeySource;
    private freeKeysPool;
    private usedKeysOriginalToStable;
    freeUnusedKeys(nextOriginalKeys: React.Key[]): void;
    getStableKey(originalKey: React.Key): React.Key;
    private getNextKeyFromPool;
    private freeUnusedKey;
}

/// <reference types="react" />
import { IMap } from '../types';
/**
 * Note: In few places the recycling logic leverages the fact that in JavaScript
 * when object keys are integers they are iterated in ascending numeric order
 * (except for IE of course...). See:
 * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order.
 */
export declare class RecycleManager {
    private stableKeySource;
    private freeKeysPool;
    private usedKeysOriginalToStable;
    freeUnusedKeys(nextOriginalKeys: IMap<boolean>): void;
    getStableKey(originalKey: React.Key): React.Key;
    private getNextKeyFromPool;
    private freeUnusedKey;
}

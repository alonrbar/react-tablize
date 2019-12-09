import { IMap } from '../types';

/**
 * Note: In few places the recycling logic leverages the fact that in JavaScript
 * when object keys are integers they are iterated in ascending numeric order
 * (except for IE of course...). See:
 * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order.
 */
export class RecycleManager {

    private stableKeySource = 0;
    private freeKeysPool: IMap<boolean> = {};
    private usedKeysOriginalToStable: IMap<React.Key> = {};

    //
    // public methods
    //

    public freeUnusedKeys(nextOriginalKeys: IMap<boolean>) {

        const nextKeys = Object.keys(nextOriginalKeys);
        const prevKeys = Object.keys(this.usedKeysOriginalToStable);

        let nextIndex = nextKeys.length - 1;
        let prevIndex = prevKeys.length - 1;

        while (nextIndex >= 0 && prevIndex >= 0) {

            const nextOriginal = nextKeys[nextIndex];
            const prevOriginal = prevKeys[prevIndex];

            if (nextOriginal === prevOriginal) {

                // still using the key - don't free
                nextIndex--;
                prevIndex--;

            } else if (nextOriginal > prevOriginal) {

                // still using the key - don't free
                nextIndex--;

            } else {

                // not using the key - return to pool
                this.freeUnusedKey(prevOriginal);
                prevIndex--;
            }
        }

        // return remaining keys to pool
        while (prevIndex >= 0) {
            const prevOriginal = prevKeys[prevIndex];
            this.freeUnusedKey(prevOriginal);
            prevIndex--;
        }
    }    

    public getStableKey(originalKey: React.Key): React.Key {

        if (this.usedKeysOriginalToStable[originalKey] !== undefined) {
            return this.usedKeysOriginalToStable[originalKey];

        } else {
            const stableKey = this.getNextKeyFromPool();
            this.usedKeysOriginalToStable[originalKey] = stableKey;
            return stableKey;
        }
    }

    //
    // private methods
    //

    private getNextKeyFromPool(): React.Key {

        // find next key in pool        
        let result: React.Key;
        for (const key in this.freeKeysPool) {
            if (this.freeKeysPool.hasOwnProperty(key)) {
                result = key;
                break;
            }
        }

        if (result === undefined) {

            // generate new key
            result = this.stableKeySource;
            this.stableKeySource++;

        } else {

            // remove from pool
            delete this.freeKeysPool[result];
        }

        return result;
    }

    private freeUnusedKey(originalKey: React.Key): void {
        const stableKey = this.usedKeysOriginalToStable[originalKey];
        delete this.usedKeysOriginalToStable[originalKey];
        this.freeKeysPool[stableKey] = true;
    }
}
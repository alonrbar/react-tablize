import { IMap } from '../../types';

export class RecycleManager {

    private stableKeySource = 0;
    private freeKeysPool: IMap<boolean> = {};
    private usedKeysOriginalToStable: IMap<React.Key> = {};

    //
    // public methods
    //

    public freeUnusedKeys(nextOriginalKeys: React.Key[]): void {

        const nextKeys = nextOriginalKeys.slice();
        nextKeys.sort();
        const prevKeys = Object.keys(this.usedKeysOriginalToStable);
        prevKeys.sort();

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
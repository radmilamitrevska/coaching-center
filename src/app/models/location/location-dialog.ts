import {Location} from './location';

export class LocationDialog {
    constructor(
        public location: Location,
        public edit: boolean,
        public key?: number,
    ) {  }
}
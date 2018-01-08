import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from '../../../../models/location/location';

@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html'
})
export class SingleLocationComponent {
    @Input('location') location: Location;
    @Input('index') index: number;
    @Output() deleteLocation = new EventEmitter();
    @Output() editLocation = new EventEmitter();

    /**
     * Emitter for delete location
     */
    deleteLocationFunc() {
        this.deleteLocation.emit(this.index);
    }

    /**
     * Emitter for edit location
     */
    editLocationFunc() {
        this.editLocation.emit({
            location: this.location,
            index: this.index
        });
    }
}

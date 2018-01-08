import {Location} from '../location/location';
import {CourseInterface} from './course.interface';

export class Course implements CourseInterface {
    constructor(
        public title: string = '',
        public start_date: string = '',
        public end_date: string = '',
        public status: string = '',
        public continuous: boolean = false,
        public contact: string = '',
        public details: string = '',
        public is_remote: boolean = false,
        public instructors: Array<number> = [],
        public location: Array<Location> = [],
        public id?: number,
    ) {  }
}
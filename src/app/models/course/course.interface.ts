import {Location} from '../location/location';

export interface CourseInterface {
    title: string;
    start_date: string;
    end_date: string;
    status: string;
    continuous: boolean;
    contact: string;
    details: string;
    is_remote: boolean;
    instructors: Array<number>;
    location: Array<Location>;
    id?: number;
}
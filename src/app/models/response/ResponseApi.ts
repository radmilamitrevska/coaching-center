import {Course} from '../course/course';

export interface ResponseApi {
    response_status: string;
    response_data: Course|string;
}
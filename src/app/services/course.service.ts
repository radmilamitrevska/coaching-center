import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CourseService {
    constructor(
        private http: HttpClient,
    ) {}

    /**
     * Http get call
     * @param url
     * @returns {Promise<any>}
     */
    private httpGetCourses(url): Promise<any> {
        return this.http.get<any>(url).toPromise();
    }

    /**
     * Get courses
     * @param url
     * @returns {Promise<any>}
     */
    async getCourses(url) {
        try {
            return await this.httpGetCourses(url);
        } catch (exception) {
            alert('Error in API');
            location.reload();
        }
    }

    /**
     * Http post call
     * @param data
     * @returns {Promise<any>}
     */
    private httpCallPost(data): Promise<any> {
        return this.http.post<any>(`${environment.apiUrl}/course`, data).toPromise();
    }

    /**
     * Http put call
     * @param data
     * @returns {Promise<any>}
     */
    private httpCallPut(data): Promise<any> {
        return this.http.put<any>(`${environment.apiUrl}/course/${data.id}`, data).toPromise();
    }

    /**
     * Update course
     * @param data
     * @returns {Promise<any>}
     */
    async updateCourse(data) {
        try {
            return await this.httpCallPut(data);
        } catch (exception) {
            alert('Error in API');
            location.reload();
        }
    }

    /**
     * Add course
     * @param data
     * @returns {Promise<any>}
     */
    async createCourse(data) {
        try {
            return await this.httpCallPost(data);
        } catch (exception) {
            alert('Error in API');
            location.reload();
        }
    }
}

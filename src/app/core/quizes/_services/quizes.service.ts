import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';

// url
const BASE_URL = environment.BASE_URL;

@Injectable()
export class QuizesService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }


	// creates new quiz
	createQuiz(quiz): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.post<any>(`${BASE_URL}/quiz`, quiz, {
			headers: {
				'Authorization': 'Bearer ' + userToken,
			}
		});
	}

	getLeaderscore(): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.get<any>(`${BASE_URL}/quiz/leaderboard`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	getLeaders(): Observable<any[]> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.get<any[]>(`${BASE_URL}/quiz/leaderboard`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// get all quizes
	getQuizes(skip, limit): Observable<any[]> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.get<any[]>(`${BASE_URL}/quiz`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			},
			params: {
				limit: limit,
				skip: skip,
			}
		});
	}

	getQuizesCount(): Observable<any[]> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.get<any[]>(`${BASE_URL}/quiz/count`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}


	getQuiz(id): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.get<any>(`${BASE_URL}/quiz/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// update a quiz
	updateQuiz(id, quiz) {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.put<any>(`${BASE_URL}/quiz/${id}`, quiz, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// delete a quiz
	deleteQuiz(id: string): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		return this.http.delete<any>(`${BASE_URL}/quiz/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}
}

import { User } from './user.model';

export class CurrentUser {
	private _token: string;
	private _user: User;

	get token(): string {
		return this._token;
	}

	set token(value: string) {
		this._token = value;
	}

	get user(): User {
		return this._user;
	}

	set user(value: User) {
		this._user = value;
	}
}

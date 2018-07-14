export class User {
	private _id: string;
	private _email: string;
	private _password: string;
	private _profile: string;

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get password(): string {
		return this._password;
	}

	set password(value: string) {
		this._password = value;
	}

	get profile(): string {
		return this._profile;
	}

	set profile(value: string) {
		this._profile = value;
	}
}

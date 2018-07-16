import { User } from './user.model';

export class Ticket {
	public id: string;
	public number: number;
	public title: string;
	public status: string;
	public priority: string;
	public image: string;
	public user: User;
	public assignedUser: User;
	public data: string;
	public changes: Array<string>;

	// constructor(
	// 		id: string,
	// 		number: number,
	// 		title: string,
	// 		status: string,
	// 		priority: string,
	// 		imagem: string,
	// 		user: User,
	// 		assignedUser: User,
	// 		data: string,
	// 		changes: Array<string>
	// ) {
	// }

	// get id(): string {
	// 	return this._id;
	// }
	//
	// set id(value: string) {
	// 	this._id = value;
	// }
	//
	// get number(): number {
	// 	return this._number;
	// }
	//
	// set number(value: number) {
	// 	this._number = value;
	// }
	//
	// get title(): string {
	// 	return this._title;
	// }
	//
	// set title(value: string) {
	// 	this._title = value;
	// }
	//
	// get status(): string {
	// 	return this._status;
	// }
	//
	// set status(value: string) {
	// 	this._status = value;
	// }
	//
	// get priority(): string {
	// 	return this._priority;
	// }
	//
	// set priority(value: string) {
	// 	this._priority = value;
	// }
	//
	// get imagem(): string {
	// 	return this._imagem;
	// }
	//
	// set imagem(value: string) {
	// 	this._imagem = value;
	// }
	//
	// get user(): User {
	// 	return this._user;
	// }
	//
	// set user(value: User) {
	// 	this._user = value;
	// }
	//
	// get assignedUser(): User {
	// 	return this._assignedUser;
	// }
	//
	// set assignedUser(value: User) {
	// 	this._assignedUser = value;
	// }
	//
	// get data(): string {
	// 	return this._data;
	// }
	//
	// set data(value: string) {
	// 	this._data = value;
	// }
	//
	// get changes(): Array<string> {
	// 	return this._changes;
	// }
	//
	// set changes(value: Array<string>) {
	// 	this._changes = value;
	// }
}

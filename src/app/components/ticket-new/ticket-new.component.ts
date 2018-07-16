import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { ResponseApi } from '../model/response-api';
import { Ticket } from '../model/ticket.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-ticket-new',
	templateUrl: './ticket-new.component.html',
	styleUrls: ['./ticket-new.component.scss']
})
export class TicketNewComponent implements OnInit {

	@ViewChild('form')
	form: NgForm;

	ticket = new Ticket();
	shared: SharedService;
	message: {};
	classCss: {};

	constructor(
			private ticketService: TicketService,
			private route: ActivatedRoute,
	) {
		this.shared = SharedService.getInstance();
	}

	ngOnInit() {
		const id: string = this.route.snapshot.params['id'];
		if (id !== undefined) {
			this.findById(id);
		}
	}

	findById(id: string) {
		this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
			this.ticket = responseApi.data;
		}, err => {

			this.showMessage({
				type: 'error',
				text: err['error']['errors'][0]
			});
		});
	}

	register() {
		this.message = {};
		this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
			this.ticket = new Ticket();
			const ticket: Ticket = responseApi.data;
			this.form.resetForm();
			this.showMessage({
				type: 'success',
				text: `Registered ${ticket.title} successfully`
			});
		}, err => {
		  console.log('err: ', err);
			this.showMessage({
				type: 'error',
				text: err['error']['errors'][0]
			});
		});
	}

	onFileChange(event): void {
		if (event.target.files[0].size > 2000000) {
			this.showMessage({
				type: 'error',
				text: 'Maximum image size is 2 MB'
			});
		} else {
			this.ticket.image = '';
			const reader = new FileReader();
			reader.onloadend = (e: Event) => {
				this.ticket.image = reader.result;
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	private showMessage(message: { type: string, text: string }): void {
		console.log('message: ', message);
		this.message = message;
		this.buildClasses(message.type);
		setTimeout(() => {
			this.message = undefined;
		}, 3000);
	}

	private buildClasses(type: string): void {
		this.classCss = {
			'alert': true
		};
		this.classCss['alert-' + type] = true;
	}

	getFromGroupClass(isInvalid: boolean, isDirty): {} {
		return {
			'is-invalid': isInvalid && isDirty,
			'is-valid': !isInvalid && isDirty,
		};
	}

}

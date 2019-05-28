import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
@Component({
    selector: 'app-page-first',
    templateUrl: './firstPage.component.html',
    styleUrls: ['./firstPage.component.scss']
})
export class FirstPageComponent implements OnInit {
    private dataMessages: any[] = [];
    showMessages = [];
    controlInput: FormControl;
    controlSelect: FormControl;
    controlButton: FormControl;
    constructor(private router: Router) {
        this.controlInput = new FormControl({ value: '' });
        this.controlInput.reset();
        this.controlSelect = new FormControl({ value: undefined });
        this.controlButton = new FormControl({ value: 'Add Message', disabled: true });
    }

    label = {
        'options': [{ 'key': 'Low', 'value': 'Low' },
        { 'key': 'Medium', 'value': 'Medium' },
        { 'key': 'High', 'value': 'High' }]
    };

    onChangeValue() {
        if (this.controlInput.value !== '' && this.controlInput.value !== null && this.controlInput.value && this.controlSelect.value) {
            this.controlButton.enable();
        } else {
            this.controlButton.disable();
        }
    }

    ngOnInit() {
        if (this.router['routingData']) {
            this.dataMessages = this.router['routingData']['dataMessages'];
        }
        this.controlButton.disable();
        this.sortByDateAdded(this.dataMessages);
        this.buildShowMessages();
    }
    showDetails(id: number) {
        // go to page2
        this.router['routingData'] = {
            'dataMessages': this.dataMessages,
            'message': this.showMessages.find(x => x.id === id)
        };
        this.router.navigate(['/secondPage']);
    }
    addDataMessage(event) {
        const curId = Guid.create();
        const messageData = {
            'id': curId,
            'title': this.controlInput.value,
            'dateAdded': new Date(),
            'type': this.controlSelect.value
        };
        this.dataMessages.push(messageData);
        this.sortByDateAdded(this.dataMessages);
        this.buildShowMessages();
        this.controlInput.reset();
        this.controlSelect.reset();
        this.controlButton.disable();
    }
    sortByDateAdded(list) {
        if (list !== []) {
            list.sort((b, a) => new Date(a['dateAdded']).getTime() - new Date(b['dateAdded']).getTime());
        }
        return list;
    }

    buildShowMessages() {
        this.showMessages = [];
        for (const message of this.dataMessages) {
            const me = {
                'id': message['id'],
                'title': `${message['title']}  ${message['dateAdded']}  ${message['type']}`
            };
            this.showMessages.push(me);
        }
    }
}

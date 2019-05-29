import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmCancelModal } from './../modals/confirm-cancel';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-second',
    templateUrl: './secondPage.component.html',
    styleUrls: ['./secondPage.component.scss']
})
export class SecondPageComponent {
    activeModal: any;
    message;
    constructor(private modalService: NgbModal, private router: Router) {
        if (this.router['routingData']) {
            this.message = this.router['routingData']['message']['title'];
        } else { this.router.navigate(['firstPage']); }
    }

    deleteMessage() {
        const activeModal = this.modalService.open(ConfirmCancelModal, { size: 'lg', backdrop: 'static', windowClass: 'center-modal' });
        activeModal.componentInstance.confirmText = 'Do You really want to delete this message?';
        activeModal.componentInstance.confirmTitle = 'Delete dialog';
        activeModal.componentInstance.modalHeader = true;
        activeModal.componentInstance.buttonTitles = { confirm: 'Delete', close: 'Cancel' };
        activeModal.componentInstance.sourceComponent = this;
        activeModal.componentInstance.confirm = this.goBack;
        this.activeModal = activeModal;
    }

    goBack(targetComponent: SecondPageComponent) {
        // back to page 1
        const dataMessages = targetComponent.router['routingData']['dataMessages'];
        if (targetComponent.router['routingData']) {
            for (let i = 0; i < dataMessages.length; i++) {
                if (dataMessages[i].id === targetComponent.router['routingData']['message']['id']) {
                    dataMessages.splice(i, 1);
                }
            }
        }
        targetComponent.router['routingData'] = {
            'dataMessages': dataMessages,
            'message': targetComponent.router['routingData']['message']['id']
        };
        targetComponent.router.navigate(['firstPage']);
        targetComponent.activeModal.close();
    }
}

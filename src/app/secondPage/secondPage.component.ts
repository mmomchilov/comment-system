import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmCancelModal } from './../modals/confirm-cancel';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CommentService } from '../commentServices/commentService/comment.service';

@Component({
    selector: 'app-page-second',
    templateUrl: './secondPage.component.html',
    styleUrls: ['./secondPage.component.scss'],
    providers: [CommentService]
})
export class SecondPageComponent {
    activeModal: any;
    message;
    controlComment: FormControl;
    constructor(private modalService: NgbModal, private router: Router, private commentService: CommentService, ) {
        if (this.router['routingData']) {

            this.message = this.router['routingData']['message']['title'];
            this.controlComment = new FormControl({ value: this.message, disabled: false });
        } else { this.router.navigate(['firstPage']); }
    }

    deleteMessage() {
        const activeModal = this.modalService.open(ConfirmCancelModal, { size: 'lg', backdrop: 'static', windowClass: 'center-modal' });
        activeModal.componentInstance.confirmText = 'Do You really want to delete this message?';
        activeModal.componentInstance.confirmTitle = 'Delete dialog';
        activeModal.componentInstance.modalHeader = true;
        activeModal.componentInstance.buttonTitles = { confirm: 'Delete', close: 'Cancel' };
        activeModal.componentInstance.sourceComponent = this;
        activeModal.componentInstance.confirm = this.goDeleteBack;
        this.activeModal = activeModal;
    }

    updateMessage() {
        const dataMessages = this.router['routingData']['dataMessages'];
        if (this.router['routingData']) {
            for (let i = 0; i < dataMessages.length; i++) {
                if (dataMessages[i].id === this.router['routingData']['message']['id']) {
                    const commentData = this.commentService.
                        createComment(this.controlComment.value, dataMessages[i].type);
                    dataMessages[i] = commentData;
                }
            }
        }

        this.router['routingData'] = {
            'dataMessages': dataMessages
        };
        this.goBack();
    }

    goBack() {
        this.router.navigate(['firstPage']);
    }

    goDeleteBack(targetComponent: SecondPageComponent) {
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
            'dataMessages': dataMessages
        };
        targetComponent.router.navigate(['firstPage']);
        targetComponent.activeModal.close();
    }
}

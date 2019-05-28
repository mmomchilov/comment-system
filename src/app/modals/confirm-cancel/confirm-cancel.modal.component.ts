import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-cancel-modal',
  styleUrls: ['confirm-cancel.modal.scss'],
  templateUrl: 'confirm-cancel.modal.html'
})

export class ConfirmCancelModal implements OnInit {
  @Input() confirmText: string;
  @Input() confirmTitle: string;
  @Input() buttonTitles?: { confirm: string, close: string };
  @Input() sourceComponent: any;
  @Input() blockedAmountTableSource: any;
  @Input() modalHeader: any;
  @Input() confirm: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.buttonTitles = this.buttonTitles ||
      {
        confirm: 'Validate',
        close: 'Cancel'
      };
  }

  closeModal() {
    this.activeModal.close();
  }

}

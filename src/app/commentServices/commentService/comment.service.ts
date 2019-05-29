import { Injectable } from '@angular/core';

import { Guid } from 'guid-typescript';

@Injectable()
export class CommentService {
  constructor() { }

  addDataMessage(title, type) {
    const curId = Guid.create();
    const messageData = {
      'id': curId,
      'title': title,
      'dateAdded': new Date(),
      'type': type
    };
  }
}

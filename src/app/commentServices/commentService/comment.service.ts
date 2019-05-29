import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
@Injectable()
export class CommentService {
  constructor() { }

  createComment(title, type) {
    const curId = Guid.create();
    const commentData = {
      'id': curId,
      'title': title,
      'dateAdded': new Date(),
      'type': type
    };
    return commentData;
  }
}

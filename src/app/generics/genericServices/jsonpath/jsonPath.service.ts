import { Injectable } from '@angular/core';


const jp = require('jsonpath/jsonpath');

@Injectable()
export class JsonPath {
  public get() {
    return jp;
  }
}

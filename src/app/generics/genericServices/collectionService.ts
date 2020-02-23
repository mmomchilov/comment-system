import { JsonPath } from '../genericServices/jsonpath/jsonPath.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CollectionService {

    constructor(private jsonPath: JsonPath) { }

    initializeValue(collection, line, defaultValue) {
        const path: string = line.path;
        let fieldPathObj = collection;
        if (path) {
            const pathLst = path.split('.');
            pathLst
                .filter(el => el !== '')
                .forEach(level => {
                    if (!fieldPathObj[level]) {
                        fieldPathObj[level] = {};
                    }
                    fieldPathObj = fieldPathObj[level];
                });
        }
        fieldPathObj[line.field] = defaultValue;
    }

    getFieldVal(field: string, line: any, collection): string {
        let path = '';
        if (line.path) {
            path = line.path;
        }
        if (line.fieldCode) {
            field = line.fieldCode;
        }
        let fieldVal = this.jsonPath.get().query(collection, `$.${path}${field}`)[0];
        if (fieldVal === undefined && path === '') {
            fieldVal = collection[field];
        }
        if (!fieldVal && line.defaultValue) {
            fieldVal = line.defaultValue;
        }

        // if (line.type === 'date') {
        //   if (!this.isViewMode()) {
        //     fieldVal = DateUtils.extractDateParamsToDatePicker(fieldVal);
        //   } else {
        //     fieldVal = DateUtils.formatDate(fieldVal, 'dd/MM/yyyy');
        //   }
        // }

        if (line.value && typeof line.value === 'function') {
            fieldVal = line.value(fieldVal);
        }

        if (fieldVal && line.displayValue && typeof line.displayValue === 'function') {
            fieldVal = line.displayValue(fieldVal);
        }
        return fieldVal;
    }

    initList(field, config, collection) {
        let items = config.items;
        if (!config.items) {
            items = this.getFieldVal(field, config, collection);
            if (!items) {
               return this.initializeItems(field, config, collection);
            }
        }
        return items;
    }

    private initializeItems(field, config, collection) {
        const fullPath = config.path;
        let items = [];
        if (fullPath) {
            const path = fullPath.substring(0, fullPath.length - 1);
            if (!collection[path]) {
                collection[path] = {};
            }
            collection[path][field] = [];
            items = collection[path][field];
        } else {
            collection[field] = [];
            items = collection[field];
        }
        return items;
    }

}

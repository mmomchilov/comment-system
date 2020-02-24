import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { CommentService } from './../commentServices/commentService/comment.service';
import { CardContentConfiguration } from '../generics/configurationClasses/cardContentConfiguration';
import { CollectionService } from '../generics/genericServices/collectionService';

@Component({
    selector: 'app-page-first',
    templateUrl: './firstPage.component.html',
    styleUrls: ['./firstPage.component.scss'],
    providers: [CommentService, CollectionService]
})
export class FirstPageComponent implements OnInit {

    @Output() selectedNode = new EventEmitter();

    private dataMessages: any[] = [];
    showMessages: any[] = [];
    controlInput: FormControl;
    controlSelect: FormControl;
    controlButton: FormControl;
    // !!!!!
    // { type: 'tree' };

    content = {
        "type": "tree",
        "tree": {
            "nodes": [],
            "add": {
                "enableAddButton": true,
                "allowAddSubnodes": false
            },
            "delete": {
                "allowDelete": true
            },
            "display": {
                "addNewNode": {
                    "title": "localizationResource.message-configuration.message-conf-mapping.dataGroupLst.addNew.shortLabel"
                },
                "config": {
                    "title": "STM",
                    "isOpenedHeader": false,
                    "actions": {
                        "add": true,
                        "delete": true
                    },
                    "columnSize": 4,
                    "content": {
                        "type": "simpleInputs",
                        "selectedTab": "general",
                        "tabs": [
                            {
                                "field": "general",
                                "filterName": "general",
                                "label": "localizationProperty.message-configuration.message-conf-mapping.dataGroupLst.generalInfo.shortLabel"
                            },
                            {
                                "field": "fields",
                                "filterName": "fields",
                                "label": "localizationProperty.message-configuration.message-conf-mapping.dataGroupLst.dataFields.shortLabel"
                            }
                        ],
                        "fields": [
                            [
                                {
                                    "field": "code",
                                    "labelPath": "dataGroupLst",
                                    "filter": "general",
                                    "type": "input",
                                    "validators": {
                                        "isRequired": true
                                    },
                                    "columnSize": 2
                                },
                                {
                                    "field": "technical",
                                    "labelPath": "dataGroupLst",
                                    "filter": "general",
                                    "type": "select",
                                    "enum": "yesno",
                                    "columnSize": 2
                                },
                                {
                                    "field": "size",
                                    "labelPath": "dataGroupLst",
                                    "filter": "general",
                                    "type": "input",
                                    "columnSize": 2
                                },
                                {
                                    "field": "description",
                                    "labelPath": "dataGroupLst",
                                    "filter": "general",
                                    "type": "input",
                                    "columnSize": 6
                                }
                            ],
                            [
                                {
                                    "field": "nbArity",
                                    "enum": "nbArity",
                                    "labelPath": "dataGroupLst",
                                    "filter": "general",
                                    "type": "select",
                                    "columnSize": 2
                                },
                                {
                                    "field": "comment",
                                    "labelPath": "dataGroupLst",
                                    "filter": "general",
                                    "type": "input",
                                    "columnSize": 10
                                }
                            ],
                            [
                                {
                                    "type": "table",
                                    "filter": "fields",
                                    "cardsList": [
                                        {
                                            "isOpenedHeader": true,
                                            "columnSize": 12,
                                            "elements": [
                                                [
                                                    {
                                                        "field": "name",
                                                        "label": "dataGroupLst.name",
                                                        "type": "input",
                                                        "columnSize": 4
                                                    },
                                                    {
                                                        "field": "label",
                                                        "label": "dataGroupLst.label",
                                                        "type": "input",
                                                        "columnSize": 4
                                                    },
                                                    {
                                                        "field": "mandatory",
                                                        "label": "dataGroupLst.mandatory",
                                                        "type": "select",
                                                        "optionsName": "yesno",
                                                        "columnSize": 2
                                                    },
                                                    {
                                                        "field": "sequence",
                                                        "label": "dataGroupLst.sequence",
                                                        "type": "input",
                                                        "columnSize": 2
                                                    }
                                                ],
                                                [
                                                    {
                                                        "field": "type",
                                                        "label": "dataGroupLst.type",
                                                        "type": "select",
                                                        "options": [
                                                            {
                                                                "code": "string",
                                                                "label": "string"
                                                            },
                                                            {
                                                                "code": "number",
                                                                "label": "number"
                                                            },
                                                            {
                                                                "code": "rate",
                                                                "label": "rate"
                                                            },
                                                            {
                                                                "code": "integer",
                                                                "label": "integer"
                                                            },
                                                            {
                                                                "code": "date",
                                                                "label": "date"
                                                            }
                                                        ],
                                                        "onChangeValue": {
                                                            "field": "enumeration"
                                                        },
                                                        "columnSize": 4
                                                    },
                                                    {
                                                        "field": "enumeration",
                                                        "label": "dataGroupLst.enumeration",
                                                        "type": "select",
                                                        "options": [
                                                            {
                                                                "code": "empty",
                                                                "label": ""
                                                            }
                                                        ],
                                                        "columnSize": 4
                                                    },
                                                    {
                                                        "field": "defaultValue",
                                                        "label": "dataGroupLst.defaultValue",
                                                        "type": "input",
                                                        "columnSize": 4
                                                    }
                                                ]
                                            ]
                                        }
                                    ],
                                    "field": "dataFields",
                                    "columnSize": 12
                                }
                            ]
                        ]
                    }
                },
                "database": "message-configuration",
                "collectionId": "message-conf-mapping",
                "collection": {
                    "code": "TEST"
                },
                "displayMode": "c"
            }
        }
    };

    constructor(private router: Router, private commentService: CommentService) {
        this.controlInput = new FormControl({ value: '', disabled: false });
        this.controlInput.reset();
        this.controlSelect = new FormControl({ value: undefined, disabled: false });
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
        const commentData = this.commentService.createComment(this.controlInput.value, this.controlSelect.value);
        this.dataMessages.push(commentData);
        this.sortByDateAdded(this.dataMessages);
        this.buildShowMessages();
        this.controlInput.reset();
        this.controlSelect.reset();
        this.controlButton.disable();
    }
    private sortByDateAdded(list) {
        if (list !== []) {
            list.sort((b, a) => new Date(a['dateAdded']).getTime() - new Date(b['dateAdded']).getTime());
        }
        return list;
    }

    private buildShowMessages() {
        this.showMessages = [];
        for (const message of this.dataMessages) {
            const me = {
                'id': message['id'],
                'title': `${message['title']}  ${message['dateAdded']}  ${message['type']}`
            };
            this.showMessages.push(me);
        }
    }

    handleSelectedNode(event) {
        this.selectedNode.emit(event);
    }
}

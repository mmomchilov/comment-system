import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ContentConfiguration } from './contentConfiguration';
import { ContainerCommunication } from './containerCommunication.service';
import { CollectionService } from '../genericServices/collectionService';
import { WidgetConfiguration } from './../../generics/configurationClasses/widgetConfiguration';

@Component({
  selector: 'gen-content-container',
  templateUrl: './contentContainer.component.html',
  styleUrls: ['./contentContainer.component.scss']
})
export class ContentContainerComponent implements OnInit, OnChanges {

  @Input() displayMode: string;
  @Input() database: string;
  @Input() collectionId: string;
  @Input() config: ContentConfiguration;
  @Input() collection: any;
  @Input() originalCollection: any;
  @Input() cards: FormArray;
  @Input() styling;

  @Output() contentEvent = new EventEmitter();
  @Output() selectedFilterEvent = new EventEmitter();

  tabs: any;
  private selectedFilter: string;
  contentList;
  formGroup = new FormGroup({});
  communicationService: ContainerCommunication;
  parentId = 'container';

  constructor(private _collectionService: CollectionService) {
    this.communicationService = new ContainerCommunication();
  }

  ngOnInit() {
    if (this.cards) {
      this.cards.push(this.formGroup);
    }
    this.contentList = this.config.list;
    this.initTabs();
    this.updateTableItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.collection && this.contentList) {
      this.updateTableItems();
    }
  }

  updateTableItems() {
    this.contentList.forEach(row => {
      row.forEach(element => {
        if (element.type === 'editableTable' || element.type === 'table') {
          this.applyDefaultTableItems(element);
        }
      });
    });
  }

  selectFilter(filterName: any) {
    this.selectedFilter = filterName;
    this.selectedFilterEvent.emit(filterName);
  }

  private initTabs() {
    if (this.config) {
      this.tabs = this.config.tabs ? this.config.tabs : undefined;
      this.selectedFilter = this.config.selectedTab;
    }
  }

  // Smart Table
  getTableSettings(config) {
    if (typeof config.settings === 'function') {
      config.settings = config.settings(this.collection);
    }
    return config.settings;
  }
  private applyDefaultTableItems(config: any): void {
    if (!config.items) {
      const field = config.field;
      config.tableItems = this._collectionService.initList(field, config, this.collection);
    } else {
      config.tableItems = config.items;
    }
  }

  isVisible(contentItem: any): boolean {
    let isHidden = false;
    if (contentItem.hidden) {
      isHidden = contentItem.hidden(this.collection);
    }
    let isFiltered = false;
    if (this.selectedFilter) {
      isFiltered = this.selectedFilter !== contentItem.filter;
    }
    return !isHidden && !isFiltered;
  }

  getComponent(type: string) {
    if (['select', 'checkbox', 'input', 'date', 'user', 'reloadButton', 'label'].includes(type)) {
      return 'simpleInputs';
    }
    return type;
  }

  getStyling() {
    if (this.styling) {
      return this.styling;
    }
    return '';
  }

  emitContentEvent(event) {
    if (event && event.onChangeValue) {
      event.onChangeValue
        .map(changeData => {
          const impactedConfig = this.findImpactedConfig(changeData);
          if (impactedConfig.type === 'editableTable') {
            this.impactEditableTable(impactedConfig, changeData, event.newValue);
          }
          this.communicationService.changeConfiguration(
            {
              id: changeData.field,
              'changeData': changeData,
              newValue: event.newValue,
              originalValueHasChanged: event.originalValueHasChanged

            });
        });

    }
    this.contentEvent.emit(event);

    if (event && event.config) {
      const label = event.config;
      if (label.customOnChangeValue) {
        const input = this.getEventInput('controlChange', label.field, event.newValue);
        label.customOnChangeValue(input);
      }
    }

  }

  private findImpactedConfig(changeData) {
    // find label details to be changed
    const impactedLine = this.contentList
      .find(row => row.find(el => el.field === changeData.field))
      .find(el => el.field === changeData.field);
    return impactedLine;
  }

  private impactEditableTable(impactedLine, changeData, newValue) {
    if (changeData.returnedType === 'promise') {
      if (changeData.settings) {
        changeData.settings(newValue).then(newSettings => impactedLine.settings = newSettings);
      }
      if (changeData.items) {
        changeData.items(newValue).then(newItems => impactedLine.tableItems = newItems);
      }
    } else {
      if (changeData.settings) {
        impactedLine.settings = changeData.settings(newValue);
      }
      if (changeData.items) {
        impactedLine.tableItems = changeData.items(newValue);
      }
    }
  }

  // Smart table
  showDetail(event: any, label: any) {
    if (label.onRowSelection) {
      label.onRowSelection(event);
    }
  }

  onSaveConfirm(event, config) {
    this.handleTableAction('update', event);
  }

  onCreateConfirm(event, config) {
    this.handleTableAction('add', event);
  }

  onDeleteConfirm(event, config) {
    this.handleTableAction('delete', event);
  }

  onCustomAction(event, config) {
    this.handleTableAction('custom', event);
  }

  private handleTableAction(action, event) {
    let config;
    this.contentList.forEach(configLst => {
      configLst.forEach(element => {
        if (element.type === 'editableTable') {
          config = element;
        }
      });
    });
    if (config.onUpdate) {
      const input = this.getEventInput(action, config.field, event);
      config.onUpdate(input);
    }
  }

  private getEventInput(actionInput, field, eventInput) {
    return { action: actionInput, 'field': field, event: eventInput, collection: this.collection };
  }

}

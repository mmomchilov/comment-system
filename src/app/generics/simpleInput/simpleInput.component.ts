import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
// import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormBuilder, FormControl, Validators, FormGroup, ValidatorFn } from '@angular/forms';
// import { ValidationComponent, CustomValidators } from '../../../pages/common/components/common/validation';
// import { DateUtils } from '../../../pages/common/components/utils/data-utils';
import { CollectionService } from '../genericServices/collectionService';
// import { JsonPath } from '../genericServices/jsonPath/jsonPath.service';
import { WidgetConfiguration, DefaultValueRule } from '../configurationClasses/widgetConfiguration';
// import { ContainerCommunication } from '../contentContainer/containerCommunication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gen-simple-input',
  templateUrl: './simpleInput.component.html',
  styleUrls: ['./simpleInput.component.scss'],
    providers: [CollectionService]
})

// export class SimpleInputComponent extends   implements OnInit, OnChanges, OnDestroy {
export class SimpleInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() parentId = '';
  @Input() locale = 'fr';
  @Input() displayMode: string;
  @Input() config;
  @Input() database: string;
  @Input() collectionId: string;
  @Input() collection: any;
  @Input() originalCollection: any;
  @Input() updates: any; // ContainerCommunication;
  @Input() formGroup = new FormGroup({});

  @Output() valueChanged = new EventEmitter();

  private temporary;
  private subscription: Subscription;
  private subscriptionTrad: Subscription;

  formErrors = {};
  validationMessages = {};

  constructor(private fb: FormBuilder, private service: CollectionService) {
  }

  ngOnInit() {
    console.log('menubar', 'me');
    if (this.updates) {
      this.subscription = this.updates.updatesForId(this.getId())
        .subscribe(configUpdate => {
          const changeData = configUpdate.changeData;
          if (configUpdate.originalValueHasChanged) {
            this.impactControl(configUpdate.newValue, changeData);
          }
        });
    }

    this.loadControls();
    this.setFormGroup(this.formGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formGroup && this.config) {
      this.loadSimpleControl();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionTrad) {
      this.subscriptionTrad.unsubscribe();
    }
  }

  setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.formGroup
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.formErrors = this.buildErrors();
    this.validationMessages = this.buildMessages();
  }

  protected onValueChanged(data?: any) {
    if (!this.formGroup) { return; }

    this.validationMessages = this.buildMessages();
    this.validationCallback();
    const form = this.formGroup;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      const control = form.controls[field];
      if (control && control.dirty) {
        this.formErrors[field] = '';
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  validationCallback() {
    // peut être surchargée dans la classe fille pour faire une action particulière,
    // comme envoyer un évènement
  }

  buildErrors() {
    let errors = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(name => {
        errors[name] = '';
      });
    }
    return errors;
  }

  buildMessages() {
    let messages = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].validator) {
          let validators = this.formGroup.controls[key].validator(this.formGroup.controls[key]);
          if (validators) {
            let message = {};
            Object.keys(validators).forEach(name => {
              let value = this.genericErrors()[name];
              let field = null;
              switch (name) {
                case 'min':
                case 'max':
                case 'number':
                case 'integer':
                case 'rate':
                case 'amount':
                case '_rate':
                case 'date':
                  field = 'expected';
                  break;
                case 'maxlength':
                case 'minlength':
                  field = 'requiredLength';
                  break;
                case 'pattern':
                  field = 'requiredPattern';
                  break;
              }
              if (field) {
                message[name] = value + ' ' + validators[name][field];
              } else {
                message[name] = value;
              }
              message[name] += '.';
            });
            messages[key] = message;
          } else {
            messages[key] = {};
          }
        }
      });
    }
    return messages;
  }


  // HTML functions: start
  isViewMode(): boolean {
    return this.displayMode === 'r';
  }

  isVisible(config: any): boolean {
    if (config.hidden) {
      return !config.hidden(this.collection);
    }
    return true;
  }

  getId(): string {
    // const res = `${this.parentId}-${this.config.field}`;
    return this.config.field;
  }

  getCustomCSS(config) {
    return config.customCSS ? config.customCSS(this.collection) : {};
  }

  isChecked(config: any, option: string): boolean {
    const field = config.field;
    const fieldVal = this.collection[field];
    if (fieldVal) {
      const filterByOption = fieldVal.filter(optnObj => optnObj[config.fieldCode] === option);
      const result = filterByOption.length > 0;
      return result;
    }
    return false;
  }


  focus(config, event) {
    const value = this.getFieldVal(config.field, config);
    this.temporary = value;
  }

  focusOut(config: WidgetConfiguration, event) {
    const value = this.getFieldVal(config.field, config);
    const oldVal = this.temporary;
    this.temporary = undefined;
    const manageFocusOut = config.onFocusOut;
    if (manageFocusOut) {
      new Promise((resolve, reject) => {
        manageFocusOut({ oldValue: oldVal, newValue: value, confirm: { 'resolve': resolve, 'reject': reject } });
      })
        .then(transformedValue => {
          this.update(config, transformedValue);
        })
        .catch(() => {
          this.update(config, oldVal);
        });
    } else {
      this.update(config, value);
    }
  }

  private update(config, valueToStore) {
    this.storeData(config, valueToStore);
    this.updateControlValue(config, valueToStore);
    this.valueChanged.emit({ collection: this.collection });
  }

  onChangeValue(config: any, event: any) {
    const newValue = this.getNewValue(event, config);
    this.storeData(config, newValue);
    this.updateControlValue(config, newValue);
    this.emitChange(newValue);
  }

  onDateChanged(newDate, config: any) {
    let newDateValue;
    if (typeof newDate === 'string') {
      newDateValue = newDate;
    } else {
      // newDateValue = DateUtils.extractTimestampFromDatePickerValue(newDate);
    }
    this.storeData(config, newDateValue);
    this.updateControlValue(config, newDateValue);
  }

  reloadCache() {
    if (this.config.onChangeValue) {
      this.onChangeValue(this.config, undefined);
    }
    if (this.config.reload) {
      this.config.reload();
    }
  }
  // HTML functions:end

  private getNewValue(event: any, line: any): any {
    let result = event;
    if (event && event.target) {
      result = event.target.value;
      if (line.type === 'checkbox') {
        result = {
          code: result,
          checked: event.target.checked
        };
      }
    }
    if (line.inputs) {
      result = {};
      const controls = this.formGroup.controls;
      for (const controlName of line.inputs) {
        result[controlName] = controls[controlName].value;
        this.formGroup.updateValueAndValidity();
      }
    }
    return result;
  }

  private impactControl(newValue, changeData) {
    const fieldValue = changeData.fieldVal;
    // Change value
    if (fieldValue && this.displayMode !== 'r') {
      // add needed data in second parameter for configuration(if need) - " onChangeValue: [{ fieldVal: ((newVal, obj)"
      // i.e.: what is in { 'collection': this.collection, ...} goes in obj of fieldVal: ((newVal, obj) in onChangeValue
      const propagatedVal = fieldValue(newValue, { 'collection': this.collection });
      this.changeFieldValue(propagatedVal);
    }
    // Change if it should be disabled or not
    if (changeData.disabled) {
      const disabled = changeData.disabled(newValue);
      this.disableField(disabled);
    }
    // Change options list (applicable for select)
    if (changeData.options) {
      if (changeData.returnedType === 'promise') {
        this.config.loading = true;
        changeData.options(newValue)
          .then(newOptions => {
            this.config.optionLst = newOptions;
            this.config.loading = false;
          });
      } else {
        const newOptions = changeData.options(newValue);
        this.config.optionLst = newOptions;
      }
    }

    if (changeData.labelCode) {
      this.config.labelCode = changeData.labelCode(newValue, { 'collection': this.collection });
      this.config.label = undefined;
      this.applyDefaultLabel(newValue, this.config);
    }

    if (changeData.validators) {
      const newValidators = changeData.validators(newValue);
      this.config.validators = newValidators;
      const listValidators = this.listFieldValidations({ validators: newValidators });
      this.formGroup.controls[this.config.field].setValidators(listValidators);
      this.formGroup.controls[this.config.field].updateValueAndValidity();
      this.formGroup.updateValueAndValidity();
    }
  }

  private valueHasChanged(config, newValue: any): boolean {
    // return newValue !== this.service.getFieldVal(config.field, config, this.originalCollection);
    return true;
  }

  private changeFieldValue(propagatedVal) {
    if (this.config.type === 'date') {
      this.onDateChanged(propagatedVal, this.config);
    } else {
      this.onChangeValue(this.config, propagatedVal);
    }
  }

  private disableField(disabled) {
    const fieldId = this.config.field;
    if (disabled) {
      this.formGroup.get(fieldId).disable();
    } else {
      this.formGroup.get(fieldId).enable();
    }
  }

  private storeData(config: any, newValue: any): void {
    if (config.storeData) {
      // custom storage function from the configuration
      config.storeData(this.collection, newValue);
    } else {
      this.storeDataDefault(config, newValue);
    }
  }

  private updateControlValue(config: any, newValue: any): void {
    if (config.type !== 'checkbox') {
      let controlValue = newValue;
      if (config.type === 'date') {
        // controlValue = DateUtils.extractDateParamsToDatePicker(newValue);
      }
      this.formGroup.controls[config.field].setValue(controlValue);
      this.formGroup.updateValueAndValidity();
    }
  }

  private storeDataDefault(config: any, newValue: any): void {
    if (config.type === 'checkbox') {
      const fieldCode = config.fieldCode;
      if (newValue.checked) {
        const obj = {};
        obj[fieldCode] = newValue.code;
        if (this.collection[config.field]) {
          this.collection[config.field].push(obj);
        } else {
          this.collection[config.field] = [obj];
        }
      } else {
        this.collection[config.field] = this.collection[config.field].filter(obj => obj[fieldCode] !== newValue.code);
      }
    } else {
      const field = config.fieldCode ? config.fieldCode : config.field;
      const fullPath = config.path;
      if (fullPath) {
        const path = fullPath.substring(0, fullPath.length - 1);
        if (!this.collection[path]) {
          this.collection[path] = {};
        }
        this.collection[path][field] = newValue;
      } else {
        this.collection[field] = newValue;
      }
    }
  }

  private getFieldVal(field: string, line: any): string {
    let fieldVal = this.service.getFieldVal(field, line, this.collection);

    if (line.type === 'date') {
      if (!this.isViewMode()) {
        //  fieldVal = DateUtils.extractDateParamsToDatePicker(fieldVal);
      } else {
        //  fieldVal = DateUtils.formatDate(fieldVal, 'dd/MM/yyyy');
      }
    }

    let fieldValue = fieldVal;
    const defaultValueRule = line.defaultValueRule;
    if (!fieldVal && defaultValueRule) {
      switch (defaultValueRule) {
        case DefaultValueRule.SINGLE_ITEM_LIST:
          if (line.optionLst && line.optionLst.length === 1) {
            const defaultValue = line.optionLst[0].code;
            fieldValue = defaultValue;
            this.service.initializeValue(this.collection, line, defaultValue);
            this.emitChange(defaultValue);
          }
          break;
        case DefaultValueRule.FIRST_ITEM:
          if (line.optionLst && line.optionLst.length > 0) {
            const defaultValue = line.optionLst[0].code;
            fieldValue = defaultValue;
            this.service.initializeValue(this.collection, line, defaultValue);
            this.emitChange(defaultValue);
          }
          break;
      }
    } else {
      if (line.refresh) {
        this.emitChange(fieldVal);
      }
    }

    return fieldValue;
  }

  private emitChange(newValue) {
    this.valueChanged.emit({
      id: this.getId(),
      onChangeValue: this.config.onChangeValue,
      config: this.config,
      'newValue': newValue,
      originalValueHasChanged: this.valueHasChanged(this.config, newValue),
      collection: this.collection
    });
  }

  private loadControls() {
    if (this.config) {
      this.loadSimpleControl();
    }
  }

  private loadSimpleControl(): void {

    const field = this.config.field;
    this.applyDefaultLabel(field, this.config);
    this.addOptions(this.config);

    const newControl = new FormControl(
      {
        value: this.getFieldVal(field, this.config),
        disabled: this.isDisplayDisabled(this.config)
      },
      this.listFieldValidations(this.config)
    );
    this.formGroup.controls[field] = newControl;
    this.formGroup.updateValueAndValidity();
  }

  private applyDefaultLabel(field: string, line: any): void {
    if (!line.label || typeof line.labelCode === 'function') {
      let labelPath = '';
      if (line.labelPath) {
        labelPath = `${line.labelPath}.`;
      }
      let labelCode = field;
      if (line.labelCode) {
        if (typeof line.labelCode === 'function') {
          labelCode = line.labelCode(this.collection);
        } else {
          labelCode = line.labelCode;
        }
      }

      line.label = `localizationProperty.${this.database}.${this.collectionId}.${labelPath}${labelCode}.shortLabel`;
    }

  }

  private addOptions(line: any): void {
    if (line.options && typeof line.options === 'function') {
      line.optionLst = line.options(this.collection);
    }

    if (line.optionsPromise) {
      line.loading = true;
      line.optionsPromise(this.collection).then(newOptions => {
        line.optionLst = newOptions;
        line.loading = false;
      });
    }

    const enumCode = line.enum;
    if (enumCode) {
      //  this.buildEnumerationList(enumCode, line);
    }
  }

  // private buildEnumerationList(enumCode: string, line: any) {
  //   const enumTranslationProperty = `localizationEnumValue.${this.database}.${enumCode}`;
  //   this.translate.get(enumTranslationProperty)
  //     .subscribe(res => {
  //       let enumerationLst = Object.keys(res)
  //         .map(key => (
  //           {
  //             code: key,
  //             display: this.getEnumTranslationCode(enumCode, key)
  //           })
  //         );
  //       if (line.enumTransformation) {
  //         enumerationLst = line.enumTransformation(enumerationLst);
  //       }
  //       line.optionLst = enumerationLst;
  //     });
  // }

  private getEnumTranslationCode(enumName: string, code: string): string {
    return `localizationEnumValue.${this.database}.${enumName}.${code}.label`;
  }

  isDisplayDisabled(config: any): boolean {
    if (this.isViewMode()) {
      return true;
    }
    if (!config.disabledDisplayModes) {
      return false;
    }
    if (config.disabled) {
      return config.disabled(this.collection);
    }
    return config.disabledDisplayModes.indexOf(this.displayMode) >= 0;
  }

  private listFieldValidations(line: any): ValidatorFn[] {
    if (line.validators) {
      return new Array(
        line.validators.isRequired ? Validators.required : Validators.nullValidator,
        this.dateFormatValidation(line),
        this.dateValidation(line.validators.date),
        // line.validators.number ? CustomValidators.number : Validators.nullValidator,
        // line.validators.integer ? CustomValidators.number : Validators.nullValidator,
        Validators.nullValidator,
        Validators.nullValidator,
        line.validators.minLength && line.validators.minLength > 0
          ? Validators.minLength(line.validators.minLength) : Validators.nullValidator,
        line.validators.maxLength && line.validators.maxLength > 0
          ? Validators.maxLength(line.validators.maxLength) : Validators.nullValidator,
      );
    } else {
      return undefined;
    }
  }
  private dateFormatValidation(line: any): ValidatorFn {

    if (line.type === 'date') {
      // return CustomValidators.dateFormatChecker();
      return Validators.nullValidator;
    } else {
      return Validators.nullValidator;
    }
  }

  private dateValidation(dateValidator: any): ValidatorFn {
    if (dateValidator && dateValidator.otherDate && dateValidator.dateComparator) {
      // return CustomValidators.dateComparator(dateValidator.otherDate, dateValidator.dateComparator);
      return Validators.nullValidator;
    } else {
      return Validators.nullValidator;
    }
  }

  genericErrors() {
    return {
      // 'required': this.translate.instant('localizationResource.common.validators.required.shortLabel'),
      // 'number': this.translate.instant('localizationResource.common.validators.number.shortLabel'),
      // 'integer': this.translate.instant('localizationResource.common.validators.integer.shortLabel'),
      // 'email': this.translate.instant('localizationResource.common.validators.email.shortLabel'),
      // 'maxlength': this.translate.instant('localizationResource.common.validators.maxlength.shortLabel'),
      // 'minlength': this.translate.instant('localizationResource.common.validators.minlength.shortLabel'),
      // 'rate': this.translate.instant('localizationResource.common.validators.rate.shortLabel'),
      // 'phone': this.translate.instant('localizationResource.common.validators.phone.shortLabel'),
      // 'min': this.translate.instant('localizationResource.common.validators.min.shortLabel'),
      // 'max': this.translate.instant('localizationResource.common.validators.max.shortLabel'),
      // 'pattern': this.translate.instant('localizationResource.common.validators.pattern.shortLabel'),
      // 'date': this.translate.instant('localizationResource.common.validators.date.shortLabel'),
      // 'dateFormat': this.translate.instant('localizationResource.common.dateformat.shortLabel'),
      // 'noAgreement': this.translate.instant('localizationResource.common.validators.errorNoAgreement.shortLabel')
    };
  }
}

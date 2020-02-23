export class ImpactedElementConfiguration {
    field: string;
    fieldVal?: any;
    options?: any;
    disabled?: any;
    labelCode?: (newVal, input) => string;
    validators?: any;
    // if the impacted element is editableTable
    settings?: any;
    returnedType?: string;
    items?: any;
}

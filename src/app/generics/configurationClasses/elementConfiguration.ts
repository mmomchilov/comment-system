// import { OnChangeValueConfiguration } from '../../baCollectionDetails/onChangeValueConfiguration';
export class ElementConfiguration {
    field: string;
    label: string;
    columnSize: number;
    type: string;
    filter?: string;
    value?: any;
    default?: any;
    enableDisplay?: string;
    validators?: any;
    storeData?: (collection, newVal) => void;
    enumValue?: any;
    path?: string;
    fieldCode?: string;

    options?: any[];
    optionsName?: string;
    optionsPromise?: (collection) => Promise<any>;
    rank?: number;

    // onChangeValue?: OnChangeValueConfiguration;
    /**Pass a custom function when the focus is lost.*/
    onFocusOut?: (event) => void;
}

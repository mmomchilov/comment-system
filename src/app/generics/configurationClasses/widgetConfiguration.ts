
import { ComboBoxItem } from './comboBoxItem';
import { ImpactedElementConfiguration } from './impactedElementConfiguration';
// import { CardListConfiguration } from '../../addRemoveTable/cardListConfiguration';

export enum DefaultValueRule {
  SINGLE_ITEM_LIST = 'singleItemList',
  FIRST_ITEM = 'firstItem'
}
export class WidgetConfiguration {
  /**Type of the control. Available values:
   * input, select, date, checkbox, user, relodButton
   * table, editableTable*/
  type: string;

  /**Pass a custom function to remove the item from table.*/
  confirmDelete?: (event) => void;

  /**Pass a custom function when the focus is lost.*/
  onFocusOut?: (event) => void;

  /**Field path for embedded fields. Used for reading the value from the collection
   * and storing it in case the control  is updated.*/
  path?: string;
  /**Field - used for identifying the control, storage and label generation. */
  field?: string;
  /**Field code that is used for storage. If not specified - the field is taken */
  fieldCode?: string;
  /**Custom storage that is executed instead of the default one. */
  storeData?: (collection, newVal) => void;
  /**Arrow function that is executed after the value if taken from the collection.
   * It can be used to map collection values to values for display.
   * @example value: (val => val ? 'yes' : 'no')
   */
  value?: any;
  /** Store default value to the collection -  for example 
   * if combo box has only one item -> DefaultValueRule.SINGLE_ITEM_LIST
   * if the first item should be selected - DefaultValueRule.FIRST_ITEM*/
  defaultValueRule?: DefaultValueRule;
  /**Default value that is used if no value in the collection */
  defaultValue?: any;
  /**Execute onChange dependencies when the value is initialized. 
   * To be used when the collection can change and some widgets need to be recalculated. */
  refresh?: boolean;
  /**Manages dependencies when changing a control value */
  onChangeValue?: ImpactedElementConfiguration[];
  /**Custom arrow function to be executed after the default onChangeValue. */
  customOnChangeValue?: any;
  onRowSelection?: any;

  /**What part of the screen to take. It uses bootstrap classes for styling */
  columnSize?: any;
  /**Table settings. Applicable for type = 'editableTable'. Same as smart table settings.*/
  settings?: any;
  /**Validators to be applied for the control */
  validators?: any;

  /**Applicable for type='select'. Used to define the list for a combo box.*/
  options?: (newVal) => ComboBoxItem[];
  /**Applicable for type='select'. It's an arrow function that gets the collection as parameter
   * and returns a promise. Can be used to load options from a service.
   */
  optionsPromise?: (collection) => Promise<any>;
  /**Enumeration code. It's applicable for type='select' for options from an enumeration. */
  enum?: string;
  /** Function to be applied to options list after enumeration values are calculated*/
  enumTransformation?: (enumLst) => ComboBoxItem;

  /**Applicable for types: 'table' and 'editableTable'. Defines the rows data for the table*/
  items?: any;
  onUpdate?: any;

  /**Applicable for type='checkbox' */
  splitSize?: number;

  /**Specifies if the control should be visible or not. It's an arrow function that takes
   * the collection as parameter and returns a boolean value.
   * @example hidden: collection => collection.code === 'CODE'
   */
  hidden?: any;

  disabledDisplayModes?: string;
  /**Specifies if the control should be disabled or not.*/
  disabled?: any;

  /**Widget is visible only when the filter specified is selected (Used for tabs) */
  filter?: string;

  /**Used to show/hide the label. */
  isNotVisible?: boolean;
  hideLabel?: boolean;
  /**Full label to be translated. If specified, labelPath and labelCode are irrelevant. */
  label?: string;
  /**Specify path different from the default one. */
  labelPath?: string;
  /**Label code to be added to the label path. It's the field by default.*/
  labelCode?: any;

  /**Custom styling*/
  customCSS?;

  reload?: any;
  /**Used when type is reloadButton and onChangeValue is specified*/
  inputs?: string[];
  title?: string;

  /**Applicable for type='table'. The used component is add-remove-table. */
 // cardsList?: CardListConfiguration[];
  returnedType?: any;
}

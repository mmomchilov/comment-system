// import { TreeExplorerConfiguration } from '../../tree/treeExplorer/treeExplorerConfiguration';
import { WidgetConfiguration } from './widgetConfiguration';
import { TabConfiguration } from './tabConfigurationts';

export class CardContentConfiguration {
    /**Possible values: 'simpleInputs', 'tree' */
    type: string;

    keyWord?: string;
    limitPerPage?: number;

    selectedTab?: string;
    tabs?: TabConfiguration[];

    fields?: WidgetConfiguration[][];
   // tree?: TreeExplorerConfiguration;
}

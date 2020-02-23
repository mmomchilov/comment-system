import { CardContentConfiguration } from './cardContentConfiguration';

export class CardConfiguration {
    /**Header title */
    title: any;
    /**Defines if the card body is visible or collapsed*/
    isOpenedHeader: boolean;
    /**Defines if expand/collapse is displayed */
    openCloseHeader?:boolean;
    /**List of actions in the header*/
    actions?: any;

    columnSize: number;
    minContentHeight?: string;

    /**Card body content */
    content: CardContentConfiguration;
}

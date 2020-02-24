import { MessageConfiguration } from './tasks/messageConfiguration';
import { DelegateReport } from './tasks/delegateReport';
import { Agreement } from './tasks/agreement';
import { Rejection } from './tasks/rejection';
import { TransferSession } from './tasks/transfercession';

export class BackUpTranslations {
    static translations: any = {
        // ...MessageConfiguration.translation(),
        // ...DelegateReport.translation(),
        // ...Agreement.translation(),
        // ...Rejection.translation(),
        // ...TransferSession.translation()
    };

    static translate(code: string, interpolateParams) {
        let valueFromDemoTranslations = this.translations[code];
        if (valueFromDemoTranslations) {
            if (interpolateParams) {
                const keys = Object.keys(interpolateParams);
                keys.forEach(key => {
                    const param = `{{${key}}}`;
                    valueFromDemoTranslations = valueFromDemoTranslations.replace(param, interpolateParams[key]);
                });
            }
            return valueFromDemoTranslations;
        }
        if (code.substring(0, 12) === 'localization') {
            const splitKey = code.split('.');
            return splitKey.length > 1 ? `${splitKey[splitKey.length - 2]} DFLT` : code;
        }
    }
}

import { ShareButtonsComponent } from './components/share-buttons/share-buttons.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { ShareButtonDirective } from './directives/share-button/share-button.directive';
import { ShareButtonsService } from './services/share-buttons.service';
import { WindowService } from './services/window.service';
import { NFormatterPipe } from './helpers/n-formatter.pipe';
import { ShareButton, ShareArgs, ShareProvider } from './helpers/index';
export declare class ShareButtonsModule {
    static forRoot(): {
        ngModule: typeof ShareButtonsModule;
        providers: (typeof ShareButtonsService | typeof WindowService)[];
    };
}
export { ShareButtonsComponent, ShareButtonComponent, ShareButtonDirective, ShareButton, NFormatterPipe, ShareButtonsService, ShareArgs, ShareProvider };

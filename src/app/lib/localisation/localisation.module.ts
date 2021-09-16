import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalisationService } from './localisation.service';
import { LocalisationConfigService } from './localisation-config.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, TranslateModule.forChild()],
  exports: [TranslateModule]
})
export class LocalisationModule {
  public static forRoot(config: any): ModuleWithProviders<LocalisationModule> {
    return {
      ngModule: LocalisationModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initLocalizationService,
          deps: [LocalisationService],
          multi: true
        },
        LocalisationService,
        { provide: LOCALE_ID, useValue: config.locale_id },
        { provide: LocalisationConfigService, useValue: config }
      ]
    };
  }
}

export function initLocalizationService(service: LocalisationService) {
  return () => service.initService();
}

/**
 * localisation module based on https://www.geekstrick.com/easily-translate-angular-12-app-using-ngx-translate/
 */

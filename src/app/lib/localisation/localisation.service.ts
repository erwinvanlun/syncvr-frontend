import { Injectable, Optional, SkipSelf } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalisationConfigService } from './localisation-config.service';


@Injectable()
export class LocalisationService {
  private _localeId: string = 'us-en';

  constructor(
    @Optional() @SkipSelf() private singleton: LocalisationService,
    private config: LocalisationConfigService,
    private translateService: TranslateService
  ) {
    if (this.singleton) {
      throw new Error(
        'LocalisationService is already provided by the root module'
      );
    }
    this._localeId = this.config.locale_id;
  }

  public get localeId () {
    return this._localeId;
  }

  public initService(): Promise<void> {
    this._localeId = localStorage.getItem('language') || 'us-en';
    return this.useLanguage(this._localeId);
  }

  public useLanguage(lang: string): Promise<void> {
    this.translateService.setDefaultLang(lang);
    return this.translateService
      .use(lang)
      .toPromise()
      .catch(() => {
        throw new Error('LocalisationService.init failed');
      });
  }

  public translate(key: string | string[], interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }
}

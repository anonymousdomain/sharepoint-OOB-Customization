import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QuickListWebPartStrings';
import QuickListApp from './components/QuickListApp';
import { IQuickListProps } from './components/IQuickListProps';

import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';
export interface IQuickListWebPartProps {
  listName: string;
}

export default class QuickListWebPart extends BaseClientSideWebPart<IQuickListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuickListProps> = React.createElement(
      QuickListApp,
      {
        listTitle: this.properties.listName,
        ctx: this.context,
        themeVariant: this._themeVariant,
        webPartSectionSize: this.domElement.getBoundingClientRect().width
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }




  
  /**
 * ===========================================================
 * BEGIN Theme friendly framework
 * 
 * use this to make sure the web part adjust to the theme and section bg color changes
 * ===========================================================
 */
private _themeProvider: ThemeProvider;
private _themeVariant: IReadonlyTheme | undefined;


protected onInit(): Promise<void> {
  // Consume the new ThemeProvider service
  this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

  // If it exists, get the theme variant
  this._themeVariant = this._themeProvider.tryGetTheme();

  // Register a handler to be notified if the theme variant changes
  this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

  return super.onInit();
}

/**
* Update the current theme variant reference and re-render.
*
* @param args The new theme
*/
private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
  this._themeVariant = args.theme;
  this.render();
}


/**
* ===========================================================
* END Theme friendly framework
* ===========================================================
*/
}//end of class

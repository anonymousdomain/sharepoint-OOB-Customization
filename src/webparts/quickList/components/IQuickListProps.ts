import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IQuickListProps {
  listTitle:string;
  ctx:WebPartContext;
  themeVariant: IReadonlyTheme | undefined;
  webPartSectionSize: number;
}

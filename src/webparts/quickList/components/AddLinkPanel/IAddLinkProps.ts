import { ILinkItemProps } from "./ILinkItemProps"
export interface IAddLinkProps {
  buttonTitle:string;
  handleAddLink(link:ILinkItemProps):any;
  hidden:boolean;
}

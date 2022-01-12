import * as React from "react";
import styles from "./QuickList.module.scss";
import { IQuickListProps } from "./IQuickListProps";
import QuickList from "./QuickList";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import * as utils from "../utils";
import { SectionSizesEnum } from "./SectionSizeEnum";
import { Customizer, FontSizes, mergeStyles, Stack } from "office-ui-fabric-react";
import AddLink from "./AddLinkPanel/AddLink";
import { ILinkItemProps } from "./AddLinkPanel/ILinkItemProps";
export default class QuickListApp extends React.Component<
  IQuickListProps,
  any
> {
  private _client: SPHttpClient = this.props.ctx.spHttpClient;
  private _webUrl = this.props.ctx.pageContext.web.absoluteUrl;
  private _sectionSize: number = this.props.webPartSectionSize;
  //private _sectionWidth: number = this.props.webPartSectionSize;
  state = {
    items: [],
    documents: [],
    sectionSize: SectionSizesEnum.small,
  };

  componentDidMount(): void {
    this._getQuickLinks();
    this._getDocuments();
    this._loadSectionSize();
  }

  private _loadSectionSize() {
    this.setState({
      sectionSize: utils.getWebPartSectionSize(this._sectionSize),
    });
  }

  private _getDocuments() {
    let url =
      this._webUrl +
      "/_api/web/Lists/getbytitle('Documents')/items?$select=File/Name,File/LinkngUri,Created,Modified&$expand=File";
    utils._getSPData(this._client, url).then((info) => {
      let data = info.value;

      this.setState({
        documents: data,
      });
    });
  }

  private _getQuickLinks() {
    let url = `${this._webUrl}/_api/web/Lists/getbytitle('QuickList')/items`;

    utils._getSPData(this._client, url).then((info) => {
      let data = info.value;
      this.setState({
        items: data,
      }); 
    });
  }
  private _addLink(link: ILinkItemProps) {
    let uri = `${this._webUrl}/_api/web/Lists/getbytitle('QuickList')/items`;
    let _spLink = {
      Title: link.title,
      Description: link.description,
      url: link.url
     
    };
    utils._postSPData(this._client, uri, JSON.stringify(_spLink)).then(post=> {
      this._getQuickLinks();
    });

  }

  public render(): React.ReactElement<IQuickListProps> {
    let _container = mergeStyles({
     marginTop:16,
     marginBottom:16
    });
    let _header = mergeStyles({
      fontSize: 20,
      marginBottom: 18,
      fontWeight: 500,
    });
    return (
      <Customizer settings={{ theme: this.props.themeVariant }}>
        <div className={styles.quickList}>
          <div className={_header}>Parent Component {this._sectionSize}</div>
          <AddLink
            buttonTitle="Add Links"
            handleAddLink={(link) => this._addLink(link)}
            hidden={!this.props.editMode}
          />
          <Stack className={_container} horizontal wrap tokens={{childrenGap:20}}>
            {this.state.items.map((item) => (
              <QuickList link={item} sectionSize={this.state.sectionSize} />
            ))}
          </Stack>
        </div>
      </Customizer>
    );
  }
}

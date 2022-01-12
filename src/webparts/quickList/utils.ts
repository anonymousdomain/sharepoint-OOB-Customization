import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http"
export const  _getSPData=async (_client: SPHttpClient, url: string): Promise<any> =>{
    let res: SPHttpClientResponse = await _client.get(
      url,
      SPHttpClient.configurations.v1
    );
    let json = res.json();
    return json;
  }
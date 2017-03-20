import {Details} from "./details";

export class Client {
  public id: string;
  public details: Details [];
  public logoUrl: string;
  public businessIndustry: string;

  public github: string;
  public linkedin: string;
  public twitter: string;
  public facebook: string;
  public google: string;


  public constructor() {
  }

  public static fromMap(json: any): Client {
    let client: Client = new Client();
    client.id = json.id;
    client.details = json.details.map(d => Details.fromMap(d));
    client.logoUrl = json.logoUrl;
    client.businessIndustry = json.businessIndustry;
    client.github = json.github;
    client.linkedin = json.linkedin;
    client.twitter = json.twitter;
    client.facebook = json.facebook;
    client.google = json.google;

    return client;
  }

  public static toMap(client: Client): any {
    return {
      details: client.details.map(d => Details.toMap(d)),
      logoUrl: client.logoUrl,
      businessIndustry: client.businessIndustry,

      github: client.github,
      linkedin: client.linkedin,
      twitter: client.twitter,
      facebook: client.facebook,
      google: client.google,
    };
  }
}

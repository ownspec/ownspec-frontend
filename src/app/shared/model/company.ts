import {User} from "./user/user";
import {Details} from "./details";

export class Company {
  public id: string;
  public details: Details [];
  public logoUrl: string;
  public host: boolean;
  public businessIndustry: string;
  public registrationNumber: string;
  public legalRepresentativeUsers: User[];

  public github: string;
  public linkedin: string;
  public twitter: string;
  public facebook: string;
  public google: string;


  public constructor() {
  }

  public static fromMap(json: any): Company {
    let company: Company = new Company();
    company.id = json.id;
    company.details = json.details.map(d => Details.fromMap(d));
    company.logoUrl = json.logoUrl;
    company.host = json.host;
    company.businessIndustry = json.businessIndustry;
    company.registrationNumber = json.registrationNumber;
    company.legalRepresentativeUsers = json.legalRepresentativeUsers.map(u => User.fromMap(u));
    company.github = json.github;
    company.linkedin = json.linkedin;
    company.twitter = json.twitter;
    company.facebook = json.facebook;
    company.google = json.google;

    return company;
  }

  public static toMap(company: Company): any {
    return {
      details: company.details.map(d => Details.toMap(d)),
      logoUrl: company.logoUrl,
      host: company.host,
      businessIndustry: company.businessIndustry,

      registrationNumber: company.registrationNumber,
      legalRepresentativeUsers: company.legalRepresentativeUsers.map((u: User) => User.toMap(u)),

      github: company.github,
      linkedin: company.linkedin,
      twitter: company.twitter,
      facebook: company.facebook,
      google: company.google,
    };
  }
}

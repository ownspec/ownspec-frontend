import {User} from "./user/user";

export class Company {
  public id:string;
  public name: string;
  public phone: string;
  public fax: string;
  public contactEmail: string;
  public addresses: string [];
  public registrationNumber: string;
  public legalRepresentativeUsers: User[];

  public constructor() {
  }


  public static fromJson(json: any): Company {
    let company: Company = new Company();
    company.phone = json.phone;
    company.fax = json.fax;
    company.contactEmail = json.contactEmail;
    company.addresses = json.addresses;
    company.registrationNumber = json.registrationNumber;
    company.legalRepresentativeUsers = json.legalRepresentativeUsers;
    return company;
  }

  public static toJson(company: Company): any {
    return {
      phone: company.phone,
      fax: company.fax,
      contactEmail: company.contactEmail,
      addresses: company.addresses,
      registrationNumber: company.registrationNumber,
      legalRepresentativeUsers: company.legalRepresentativeUsers.map((u: User) => User.toMap(u)),
    };
  }
}

export class Details {
  public id: string;

  public name: string;
  public address: string;
  public zipCode: string;
  public country: string;

  public phone: string;
  public fax: string;
  public email: string;
  public website: string;

  public billingCurrency: string;
  public isDefault: boolean;


  public constructor() {

  }

  public static fromMap(json: any): Details {
    let details: Details = new Details();
    details.id = json.id;
    details.name = json.name;
    details.address = json.address;
    details.zipCode = json.zipCode;
    details.country = json.country;
    details.phone = json.phone;
    details.fax = json.fax;
    details.email = json.email;
    details.website = json.website;

    details.billingCurrency = json.billingCurrency;
    details.isDefault = json.isDefault;
    return details;
  }

  public static toMap(details: Details): any {
    return {
      name: details.name,
      address: details.address,
      zipCode: details.zipCode,
      country: details.country,
      phone: details.phone,
      fax: details.fax,
      email: details.email,
      website: details.website,
      billingCurrency: details.billingCurrency,
      isDefault: details.isDefault,
    };
  }
}
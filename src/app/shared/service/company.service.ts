import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Company} from "../model/company";
import {Observable} from "rxjs";


@Injectable()
export class CompanyService {

  public constructor(private http: Http) {

  }

  public getHost(): Observable<Company> {
    return this.http.get("/api/companies/host")
        .flatMap(r => r.json())
        .map(item => Company.fromJson(item));
  }

  public save(company: Company): Observable<any> {
    return this.http.post("/api/companies/" + company.id, Company.toJson(company));
  }

}
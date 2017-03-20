import {OnInit, Component} from "@angular/core";
import {Company} from "../../../shared/model/company";
import {Details} from "../../../shared/model/details";
import {Http} from "@angular/http";

@Component({
  selector: 'company-edit',
  templateUrl: 'company-edit.template.html',
})
export class CompanyEditComponent implements OnInit {

  private company = new Company();
  private details = new Details();
  private addressMaxLength = 256;

  //todo: temp must use http://api.fixer.io/latest
  private currencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];

  public constructor(private http: Http) {

  }

  ngOnInit(): void {
  }

}
import * as _ from "lodash";
import * as jQuery from "jquery";

export class TocGenerator {

  private counter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  private tocBuilder: string = "";

  public tocItems: TocItem[] = [];

  private root:Element;

  public generateFromString(content: string): string {
    let dom = jQuery.parseHTML(content);
    this.tocBuilder += "<ul>\n"
    for (let e of dom) {
      this.construct(e);
    }
    this.tocBuilder += "</ul>\n"
    return this.tocBuilder;
  }

  public generateFromDom(dom: any): string {
    this.root = dom;

    this.tocBuilder += "<ul>\n"
    this.construct(dom);
    this.tocBuilder += "</ul>\n"
    return this.tocBuilder;
  }


  private construct(current: any) {
    if (current.nodeType != 1) {
      return;
    }

    var regex = /^h(\d+)$/ig;
    let res = regex.exec(current.nodeName);
    if (res != null) {
      let level: number = Number.parseInt(res[1]) - 1;
      this.reset(level + 1);
      this.counter[level]++;

      let number = this.generateNumber(level + 1);
      let id = number.replace(/\./g , "_");

      jQuery(this.root).find("#" + id).removeAttr("id");

      current.setAttribute("id" , id);

      this.tocItems.push(new TocItem(number + " " + current.innerText, id, level));

      this.tocBuilder += "<li><a>" + number + " " + current.innerText + "</a></li>\n";
    }


    for (let element of current.children) {
      this.construct(element);
    }
  }

  reset(level: number) {
    for (let i = level; i < this.counter.length; i++) {
      this.counter[level] = 0;
    }
  }

  generateNumber(level: number): string {
    let builder: string = "";
    for (let i = 0; i < level; i++) {
      builder += this.counter[i] + ".";
    }
    return builder;
  }


}


export class TocItem {
  public constructor(public title: string, public id:string, public level:number) {
  }
}

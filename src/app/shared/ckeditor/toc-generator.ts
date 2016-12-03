export class TocGenerator {

  private counter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  private tocBuilder: string = "";


  public tocItems: TocItem[] = [];

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


      current.setAttribute("id" , this.generateNumero(level + 1));

      this.tocItems.push(new TocItem(this.generateNumero(level + 1) + " " + current.innerText, this.generateNumero(level + 1), level));

      this.tocBuilder += "<li><a>" +
        this.generateNumero(level + 1) + " " + current.innerText +
        "</a></li>\n";
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

  generateNumero(level: number): string {
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

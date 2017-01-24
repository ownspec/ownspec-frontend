import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ReferenceService {

    public constructor(public $http: Http) {

    }

    response = {
        data: [
            {
                id: "REF01",
                source: "SPEC-01",
                target: "REQ-01",
                creationDate: new Date(),
                author: "foo"
            },
            {
                id: "REF02",
                source: "SPEC-02",
                target: "REQ-01",
                creationDate: new Date(),
                author: "foo"
            },
            {
                id: "REF03",
                source: "SPEC-03",
                target: "REQ-01",
                creationDate: new Date(),
                author: "foo"
            },
            {
                id: "REF04",
                source: "SPEC-04",
                target: "REQ-01",
                creationDate: new Date(),
                author: "foo"
            },


        ]
    };


    public findOneById(id: string): Observable<EntityReference> {
        return this.fetch()
            .first(c => c.id == id);
    }

    public findAll(entityId:string=null, version: string = null, comment: string = null): Observable<EntityReference[]> {
        return this.fetch()
            .filter(item => {
                console.log("filter");
                let result = true;

                return result;
            }).toArray();
    }

    private fetch(): Observable<EntityReference> {
        return Observable.from(this.response.data)
            .map(item => {
                return new EntityReference(item.id, item.source, item.target, item.creationDate, item.author);
            });
    }


}


export class EntityReference {

    constructor(public id: string, public source: string, public target: string, public creationDate: Date, public author: string) {
    };

}

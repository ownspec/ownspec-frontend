
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ResourceService {

    // necessary to help AngularJS know about what to inject and in which order
    public static $inject: Array<string> = ["$log", "$state", "$http"];

    public constructor(private $http: Http) {
    }

    response = {
        data: [
            {
                "id": "CMP-001",
                "title": "foo1",
                "description": "description1",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-002",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-003",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-004",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-005",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-006",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-007",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-008",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-009",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-0010",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": "turpis faucibus sit amet. Curabitur cursus imperdiet velit, ac pretium velit luctus sed. In vel ligula at dolor laoreet tempus ut sed tellus. Donec lacinia, fe"
            },
            {
                "id": "CMP-0011",
                "title": "foo2",
                "description": "description2",
                "creationDate": new Date(),
                "content": `

<div>
    <div>
        <div
            style="color: #003366;font-weight: bold;line-height: 1.2;font-family: Arial, Helvetica, sans-serif;margin: 0.83em 0 0.41em;font-size:16px">
            Document Properties
        </div>
        <table cellpadding="1">
            <tbody>
            <tr>
                <td align="right">
                    Status:
                </td>
                <td>
                    <img src="/polarion/icons/default/enums/req_status_draft.gif">
                    <strong class="strong">Draft</strong>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Version:
                </td>
                <td>
                    <b> </b>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Author:
                </td>
                <td>
                    System Administrator
                </td>
            </tr>
            <tr>
                <td align="right">
                    Created:
                </td>
                <td>
                    2012-01-26 14:36
                </td>
            </tr>
            </tbody>
        </table>
        <div
            style="color: #003366;font-weight: bold;line-height: 1.2;font-family: Arial, Helvetica, sans-serif;margin: 0.83em 0 0.41em;font-size:16px">
            Approved Versions
        </div>
        <table cellpadding="3" border="0" width="700px">
            <tbody>
            <tr>
                <td>1.0.1:</td>
                <td></td>
            </tr>
            <tr>
                <td>Reviewer:</td>
                <td></td>
            </tr>
            </tbody>
        </table>

        <div
            style="color: #003366;font-weight: bold;line-height: 1.2;font-family: Arial, Helvetica, sans-serif;margin: 0.83em 0 0.41em;font-size:16px">
            Document Signatures
        </div>
        <table cellpadding="3" border="0" width="700px">
            <tbody>
            <tr>
                <td>Author:</td>
                <td></td>
            </tr>
            <tr>
                <td>Reviewer:</td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>





`
            },
        ]

    };

    public findResource(id: string): Observable<Resource> {
        return Observable.from(this.response.data)
            .first(r => r.id == id)
            .map(item => {
                return new Resource(item.id, item.title, item.description, item.creationDate, item.content);
            });
    }

    public findResources(): Observable<Resource[]> {
        return Observable.from(this.response.data)
            .map(item => {
                return new Resource(item.id, item.title, item.description, item.creationDate, item.content);
            }).toArray();
    }

    public saveResource(toSave: Resource): Observable<boolean> {
        return Observable.from(this.response.data)
            .first(r => r.id == toSave.id)
            .map((item:any) => {
                item.content = toSave.content;
                item.description = toSave.description;
                item.title = toSave.title;
                return true;
            });
    }

    createResource(newResource: Resource) {
        newResource.id = "CMP-" + (this.response.data.length + 1);
        this.response.data.push(newResource);
    }
}


export class Resource {

    public constructor(public id: string, public title: string, public description: string, public creationDate: Date, public content: string) {
    }

}

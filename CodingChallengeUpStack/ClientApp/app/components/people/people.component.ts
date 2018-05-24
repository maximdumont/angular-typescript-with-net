import { Component, Inject, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
    selector: "people",
    templateUrl: "./people.component.html",
    styleUrls: ["./people.component.css"]
})
export class PeopleComponent implements OnInit {
    ngOnInit(): void {
        this.getPeopleData();
    }

    addPersonSubmissionResult: string;
    addPersonFormVisible = false;
    people: People[];
    addUserForm: FormGroup;
    private baseUrl: string;

    constructor(private http: Http, @Inject("BASE_URL") baseUrl: string, private formBuilder: FormBuilder) {
        this.baseUrl = baseUrl;
        this.addUserForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            phone: ["", Validators.required]
        });
    }

    getPeopleData(): void {
        this.http.get(this.baseUrl + "api/People").subscribe(result => {
            this.people = result.json() as People[];
        });
    }

    addPerson(): void {
        this.addPersonFormVisible = true;
    }

    savePerson(): void {
        this.http.post(this.baseUrl + "api/People",
            {
                firstName: this.addUserForm.value.firstName,
                lastName: this.addUserForm.value.lastName,
                phone: this.addUserForm.value.phone
            }).
            subscribe((data: any) => {
                this.addPersonSubmissionResult = data.statusText;
                this.getPeopleData();
            }, (err: any) => {
                console.log(err);
                this.addPersonSubmissionResult = "There was an error saving this person";
            });
        this.addUserForm.value.firstName.clear();
        this.addUserForm.value.lastName.clear();
        this.addUserForm.value.phone.clear();
        this.addPersonFormVisible = false;
    }

    removePerson(person: People): void {
        if (confirm("Are You Sure?")) {
            this.http.delete(this.baseUrl + "api/People/" + person.personId)
                .subscribe(
                    (data: any) => {
                        this.addPersonSubmissionResult = "User Deleted";
                        this.getPeopleData();
                    },
                    (error) => this.addPersonSubmissionResult = "There was an error removing this person");
        }
    }
}

interface People {
    firstName: string;
    lastName: string;
    phone: string;
    personId: number;
}
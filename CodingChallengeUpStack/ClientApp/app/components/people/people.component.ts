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

    statusSubmissionResult: string;
    addPersonFormVisible = false;
    showUpdateFormVisible = false;
    people: People[];
    updateUserForm: FormGroup;
    addUserForm: FormGroup;
    private baseUrl: string;
    formContent = {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        phone: ["", Validators.required]
    };

    constructor(private http: Http, @Inject("BASE_URL") baseUrl: string, private formBuilder: FormBuilder) {
        this.baseUrl = baseUrl;
        this.addUserForm = this.formBuilder.group(this.formContent);
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
                this.statusSubmissionResult = data.statusText;
                this.getPeopleData();
            }, (err: any) => {
                console.log(err);
                this.statusSubmissionResult = "There was an error saving this person";
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
                        this.statusSubmissionResult = "User Deleted";
                        this.getPeopleData();
                    },
                    (error) => this.statusSubmissionResult = "There was an error removing this person");
        }
    }

    person: People;
    detailPerson(person: People): void {
        this.person = person;
        this.showUpdateFormVisible = true;
        this.updateUserForm = this.formBuilder.group({
            firstName: [person.firstName, Validators.required],
            lastName: [person.lastName, Validators.required],
            phone: [person.phone, Validators.required]
        });
    }

    updatePerson(): void {
        var people: People = {
            firstName: this.updateUserForm.value.firstName,
            lastName: this.updateUserForm.value.lastName,
            phone: this.updateUserForm.value.phone,
            personId: this.person.personId
        }
        this.http.put(this.baseUrl + "api/People/" + people.personId, people).subscribe(
                (data: any) => {
                    this.statusSubmissionResult = "User Updated";
                    this.getPeopleData();
                },
                (error) => { this.statusSubmissionResult = "User Update Failed"}
        );

        this.showUpdateFormVisible = false;
    }
}

interface People {
    firstName: string;
    lastName: string;
    phone: string;
    personId: number;
}
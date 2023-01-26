import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Student } from '../../_interfaces/student';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit, AfterViewInit {

  constructor(private register:RegistrationService, private elementRef: ElementRef, public datepipe: DatePipe) {}


  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  onTrue = false;
  date: any;
  formdate = "";
  password2: string = "";
  retypepassword: string = this.password2;
  dob!: Date;

  orginalStudentSettings: Student = {
    _id: "",
    name: "",
    email: "",
    password: "thenura1",
    nic: "200308300020",
    dob: "2021/03/23",
    mobile_no: "0783323261",
    address: "272,10c-1,subhamawatha,nugegoda",
    parent_name: "ajith wijerathne",
    parent_no: "0724945027",
    landline_no: "0112821161",
    grade: "12",
    dle_access: "open",
    url: "http://localhost:5500/api/user/register",
    type: "student"
  }

  studentSettings: Student = {...this.orginalStudentSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  onSubmit(form: NgForm) {
    console.log('in on submit : '+ form.valid);
    this.datepipe.transform(this.studentSettings.dob, 'yyyy-MM-dd');
    console.log(this.studentSettings.dob)
    if(form.valid && this.studentSettings.password === this.retypepassword && this.studentSettings.grade != 'Select Grade' && this.studentSettings.dle_access != 'Set DLE Access') {
      this.messages();
      this.register.postUserSettingsForm(this.studentSettings).subscribe((result) => {
        console.log(result);
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result)
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Operation Successful with ID - " + result._id;
        }
      });
    }
  }

  orginalBody: any = {
    _id: '',
    type: "student"
  }

  body: any = {...this.orginalBody}

  onFind(search: NgForm){
    console.log("in on submit "+ search.valid);
    console.log(this.body._id);
    if(search.valid && this.body._id >= 6){
      this.messages();

      this.register.findId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "ID not Found!";
          this.postErrorFind = true;
          this.postSuccessFind = false;
          console.log(result);
        }
        else{
          this.studentSettings = result;
          //console.log(this.studentSettings._id)
          this.password2 = result.password;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = "Found ID "+ result._id ;
          this.onTrue = true;

          this.retypepassword = result.password;
          console.log(result);
        }
      })
    }
  }

  onUpdate(form: NgForm){
    console.log("in on submit "+ form.valid);
    console.log(this.studentSettings.password)
    console.log(this.password2)
    if(form.valid && this.studentSettings.password === this.retypepassword && this.studentSettings.grade != 'Select Grade' && this.studentSettings.dle_access != 'Set DLE Access'){
      this.messages();
      this.register.updateBody(this.studentSettings).subscribe((result) => {
        console.log(result);
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result)
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Update Successful on ID - "+result._id;
          this.studentSettings = {...this.orginalStudentSettings}
        }
      });
    }
  }

  onDelete(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid){
      this.messages();
      this.register.deleteUser(this.studentSettings).subscribe((result) => {
        console.log(result);
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result)
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = this.studentSettings._id+ " Deleted Successfully!"
          this.studentSettings = {...this.orginalStudentSettings}
        }
      });
    }
  }


  // isShowDiv: boolean = false;

  // clickEvent(){
  //   this.isShowDiv = !this.isShowDiv;
  // }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = 'white';
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;

    this.onTrue = false;
  }
}

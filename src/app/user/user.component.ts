import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // User Form
  userFormData!: FormGroup;
  // store User Data
  userTableData: any;

  constructor(private formBuilder: FormBuilder, private Api: UserDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetData();

    /*--------- Form Validator ---------*/
    this.userFormData = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }


  /*-----------------------------------------------------------------------------------
                                    Add Data
  -----------------------------------------------------------------------------------*/
  addData() {
    if (this.userFormData.invalid) {
      return;
    }
    this.Api.postProduct(this.userFormData.value).subscribe({
      next: (res) => {
        console.log(res);
        this.GetData();
      },
      error: (err) => {
        alert("Error While adding the data");
      },
      complete: () => {
        this.userFormData.reset(this.userFormData = new FormGroup({}));
      }
    });

  }


  /*-----------------------------------------------------------------------------------
                                    Get Data
  -----------------------------------------------------------------------------------*/
  GetData() {
    this.Api.getProduct().subscribe({
      next: (res) => {
        this.userTableData = res;
      },
      error: (err) => {
        alert("Error While Fetching the data");
      },
      complete: () => { }
    });
  }


  /*-----------------------------------------------------------------------------------
                                      Edit Data
  -----------------------------------------------------------------------------------*/
  editData(id: any) {
    this.Api.putProduct(id, this.userTableData.value).subscribe({
      next: (res) => {
        console.log(res);
        this.GetData();
        this.userFormData.reset(this.userFormData = new FormGroup({}));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('success');
      }
    });
  }


  /*-----------------------------------------------------------------------------------
                                    Edit Data
  -----------------------------------------------------------------------------------*/
  deleteData(id: any) {
    this.Api.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.GetData();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('success');
      }
    });
  }




  /*========== Get Object from Router URL when click Edit Button & Patch Object ==========*/
  // onEdit(item: any) {
  //   this.updateValue = this.userFormData.patchValue(item);
  // }


  cancel() {
    this.userFormData.reset(this.userFormData = new FormGroup({}));
  }



}





import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-reactive-multistep-form';
  genders = ['Male', 'Female'];

  states = [
    {
      id: 1,
      name: 'Kuala Lumpur',
    },
    {
      id: 2,
      name: 'Selangor',
    },
    {
      id: 3,
      name: 'Johor Bahrur',
    },
  ];

  userDetails!: FormGroup;
  contactDetails!: FormGroup;
  addressDetails!: FormGroup;
  steps: any = 1;

  userD_step = false;
  contactD_step = false;
  addressD_step = false;

  constructor(private fb: FormBuilder, private route:ActivatedRoute, private router:Router ) {}

  ngOnInit() {
    // Step 1
    this.userDetails = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: [''],
    });

    // Step 2

    this.contactDetails = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Step 3

    this.addressDetails = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: new FormControl(''),
      zip: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
    });
  }

  get users() {
    return this.userDetails.controls;
  }
  get contacts() {
    return this.contactDetails.controls;
  }
  get addressess() {
    return this.addressDetails.controls;
  }

  nextStep() {
    // this.steps = this.steps + 1;

    // Step 1 Next button
    if (this.steps == 1) {
      this.userD_step = true;
      if (this.userDetails.invalid) {
        return;
      }
      this.steps++;
      console.log(this.userDetails.value);
    }

    // step 2 Next button

    if (this.steps == 2) {
      this.contactD_step = true;
      if (this.contactDetails.invalid) {
        return;
      }
      this.steps++;
      console.log(this.contactDetails.value);
    }
  }

  previusStep() {
    // this.steps = this.steps - 1;
    // console.log(this.steps);

    this.steps--;

    if (this.steps == 1) {
      this.userD_step = false;
    }
    if (this.steps == 2) {
      this.contactD_step = false;
    }
  }
  onSubmit() {
    if (this.steps == 3) {
      this.addressD_step = true;
      if (this.addressDetails.invalid) {
        return;
      }
    }
    console.log(this.addressDetails);
  
    
  }
}

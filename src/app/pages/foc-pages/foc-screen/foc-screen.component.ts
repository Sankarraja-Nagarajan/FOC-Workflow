import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FocService } from '../../../../Services/foc.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../Services/common.service';
import { snackbarStatus } from '../../../../Enums/notification-snackbar';
import { TokenService } from '../../../../Services/token.service';
import { CustomerMaterial } from '../../../../Models/customerMaterialDetails';
import { ConditionType } from '../../../../Models/conditionType';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSaverService } from '../../../../Services/file-saver.service';
import { CommonSpinnerService } from '../../../../Services/common-spinner.service';
import { TrackingDialogComponent } from '../tracking-dialog/tracking-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-foc-screen',
  templateUrl: './foc-screen.component.html',
  styleUrls: ['./foc-screen.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class FOCScreenComponent {

  Details : any []= [];
  userDetails : any;
  dataSource : any = new MatTableDataSource();
  focForm : FormGroup;
  focArrayForm : FormGroup;
  soldtoPartyCurrency : string;
  files : any;
  trackingNo : number;
  showExecute : boolean = false;
  showDownloadAttachment : boolean = false;
  showApproveBtn : boolean = false;
  showUploadAttachment : boolean = false;
  activeStepper : any [] = [];
 
  displayedColumns : any[] = ['MaterialNO' , 'Description' , 'Quantity' , 'Amount','Currency'];
 
  Reasons = ['001 sales call'];
  
  plantList : any [] = [];

  salesOrganizationList = [
    {
      SalesOrganization : "B300",
      Name : "CAM Bengaluru",
    },
    {
      SalesOrganization : "GU00",
      Name : "CA Gurgaon",
    },
    {
      SalesOrganization : "BM00",
      Name : "CA Jamalpur",
    },
    {
      SalesOrganization : "BN00",
      Name : "CA Tech Center India",
    },
    {
      SalesOrganization : "BO00",
      Name : "CA Gujarat",
    },
    {
      SalesOrganization : "BQ00",
      Name : "CA Bangalore",
    },
    {
      SalesOrganization : "CR00",
      Name : "Ca Chennai",
    }
  ];

  distributionList = [
    {
      DistributionChannel : '1',
      Name : 'OEM'
    },
    {
      DistributionChannel : '2',
      Name : 'OE Spare Parts'
    },
    {
      DistributionChannel : '3',
      Name : 'IND Non-Automotive'
    },
    {
      DistributionChannel : '4',
      Name : 'Ancillary Business'
    },
    {
      DistributionChannel : '5',
      Name : 'OES After Series'
    },
    {
      DistributionChannel : '10',
      Name : 'Trading&Aftermarket'
    },
    {
      DistributionChannel : '50',
      Name : 'Intercompany'
    },
    {
      DistributionChannel : 'TP',
      Name : 'Template DCH'
    },
    {
      DistributionChannel : 'XX',
      Name : 'Common/Ref. DCH'
    }
  ];

  conditionList = [
    {
      ConditionType : 'ZP00',
      Name : 'Non Inter Company'
    },
    {
      ConditionType : 'ZICC',
      Name : 'Inter Company'
    }
  ];

  orderList = [
    {
      OrderReason : '1',
      Description : 'Sales call',
    },
    {
      OrderReason : '2',
      Description : 'Trade fair sales activity',
    },
    {
      OrderReason : '3',
      Description : 'Television commercial',
    },
    {
      OrderReason : '4',
      Description : 'Customer recommendation',
    },
    {
      OrderReason : '5',
      Description : 'Newspaper advertisement',
    },
    {
      OrderReason : '6',
      Description : 'Excellent price',
    },
    {
      OrderReason : '7',
      Description : 'Fast delivery',
    },
    {
      OrderReason : '8',
      Description : 'Good service',
    },
    {
      OrderReason : '9',
      Description : 'Sales of Scrap',
    },
    {
      OrderReason : '10',
      Description : 'AM: No Freight Charges for Rush Order',
    },
    {
      OrderReason : '100',
      Description : 'Price difference: price was too high',
    },
    {
      OrderReason : '101',
      Description : 'Poor quality',
    },
    {
      OrderReason : '102',
      Description : 'Damaged in transit',
    },
    {
      OrderReason : '103',
      Description : 'Quantity discrepancy',
    },
    {
      OrderReason : '104',
      Description : 'Material ruined',
    },
    {
      OrderReason : '105',
      Description : 'Free of charge sample',
    },
    {
      OrderReason : '106',
      Description : 'Customer Complaint',
    },
    {
      OrderReason : '107',
      Description : 'Freight',
    },
    {
      OrderReason : '108',
      Description : 'Other Sales',
    },
    {
      OrderReason : '109',
      Description : 'Receipt Denial',
    },
    {
      OrderReason : '110',
      Description : 'Return Shipment Avoided',
    },
    {
      OrderReason : '111',
      Description : 'development performance',
    },
    {
      OrderReason : '112',
      Description : 'tool sale',
    },
    {
      OrderReason : '200',
      Description : 'Price difference: price was too low',
    },
    {
      OrderReason : '210',
      Description : 'Marketing',
    },
    {
      OrderReason : '220',
      Description : 'AM: Debit Memo Req for Refund',
    },
    {
      OrderReason : '300',
      Description : 'CR: Damaged packaging',
    },
    {
      OrderReason : '301',
      Description : 'CR: Defective / damaged goods',
    },
    {
      OrderReason : '302',
      Description : 'CR: Delivered quantity too high',
    },
    {
      OrderReason : '304',
      Description : 'CR: Missing / damaged labels',
    },
    {
      OrderReason : '305',
      Description : 'CR: Missing shipping documents',
    },
    {
      OrderReason : '306',
      Description : 'CR: Wrong labels',
    },
    {
      OrderReason : '307',
      Description : 'CR: Wrong material delivered',
    },
    {
      OrderReason : '308',
      Description : 'CR: Wrong packaging',
    },
    {
      OrderReason : '309',
      Description : 'CR: Wrong shipping documents',
    },
    {
      OrderReason : '310',
      Description : 'CR: Quality test fail',
    },
    {
      OrderReason : '311',
      Description : 'CR: Reason unknown',
    },
    {
      OrderReason : '320',
      Description : 'CR: customer ordered wrong parts',
    },
    {
      OrderReason : '321',
      Description : 'CR: stock adjustments',
    },
    {
      OrderReason : '400',
      Description : 'CTO all item with price',
    },
    {
      OrderReason : '410',
      Description : 'CTO item 10 with price',
    },
    {
      OrderReason : '420',
      Description : 'CTO item 20 with price',
    },
    {
      OrderReason : 'EDI',
      Description : 'RB :Self-billing proced.',
    },
    {
      OrderReason : 'ORD',
      Description : 'Order reason Webshop',
    },
    {
      OrderReason : 'QBI',
      Description : 'RB :SBWAP: Difference Clearing (Qty/Val)',
    },
    {
      OrderReason : 'QOI',
      Description : 'RB: SBWAP: New Open Items (Quantity(Val)',
    },
    {
      OrderReason : 'T4',
      Description : 'RB: Pricediff. with Reminderposting',
    },
    {
      OrderReason : 'T4A',
      Description : 'RB: Pricediff. w/o Reminderposting',
    },
    {
      OrderReason : 'T4B',
      Description : 'RB: Retroactiv Billing Pricechange VFRB',
    },
    {
      OrderReason : 'T4S',
      Description : 'DM: Write-off price diff.',
    },
    {
      OrderReason : 'T5',
      Description : 'RB :Price-/Quantdiff. with Reminderpostg',
    },
    {
      OrderReason : 'T5A',
      Description : 'RB :Price-/Quantdiff. w/o Reminderpostg',
    },
    {
      OrderReason : 'T5S',
      Description : 'DM: Write-off quant. diff.',
    },
    {
      OrderReason : 'T9S',
      Description : 'DM: Write-off others',
    },
    {
      OrderReason : 'VBI',
      Description : 'RB :SBWAP: Difference Clearing (Value)',
    },
    {
      OrderReason : 'VOI',
      Description : 'RB :SBWAP: New Open Items (Value)',
    },
    {
      OrderReason : 'W01',
      Description : 'Webshop - Company with VAT',
    },
    {
      OrderReason : 'W02',
      Description : 'Webshop - Company  without VAT',
    },
    {
      OrderReason : 'W03',
      Description : 'Webshop - Small business',
    },
    {
      OrderReason : 'ZE1',
      Description : 'Partial price difference',
    },
    {
      OrderReason : 'ZE2',
      Description : 'Replacement total invoice price diff',
    },
    {
      OrderReason : 'ZE3',
      Description : 'Total invoice reason <> price diff',
    },
    {
      OrderReason : 'ZE4',
      Description : 'Total invoce',
    }
  ];





  @ViewChild(MatPaginator) paginator : MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  
 ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   // this.sort.direction = 'desc';
 }
 
   constructor(private _liveAnnouncer : LiveAnnouncer, 
              private _focService : FocService, 
              private _fb : FormBuilder, 
              private _commonService : CommonService, 
              private _tokenService : TokenService, 
              private _activatedRoute : ActivatedRoute,
              private _router : Router,
              private _fileSaver : FileSaverService, 
              private _commonSpinner : CommonSpinnerService, 
              public _dialog: MatDialog){

    this.dataSource = new MatTableDataSource(this.Details);
    this.focForm = _fb.group({
      TrackingNo : '',
      SoldToParty : ['', [Validators.required]],
      SoldToPartyName : '',
      ShipToParty : ['', [Validators.required]],
      ShipToPartyName : '',
      OrderReason : '',
      Plant : ['', [Validators.required]],
      SalesOrganization : ['', [Validators.required]],
      DistributionChannel : ['', [Validators.required]],
      ConditionType : ['', [Validators.required]],
      PoNumber : '',
      Comments : '',
    })

    this.focArrayForm = _fb.group({
      items : _fb.array([])
    })

    //console.log(this.plantList.length);

   }


   ngOnInit()
   {
   

    this.userDetails = this._tokenService.decryptToken(localStorage.getItem('FocToken'));

     for(var i = 1; i <= 5; i++)
     {
       this.add();
     }

     this._activatedRoute.queryParams.subscribe({
      next : (response) => 
      {
        if(response)
        {
          this.trackingNo = response.TrackingNo;
          this.focForm.controls.TrackingNo.patchValue(this.trackingNo);
          if(this.trackingNo)
          {
            this.getApproveMaterial();
            this.getApproveCustomer();
            this.getApprover();
          }
        }
      }
     })


     if(!this.trackingNo)
    {
      this.getTrackingNo();
      this.showUploadAttachment = true;
      this.showExecute = true;
    }

   }


   getApprover()
   {
    this._focService.getApprover(this.trackingNo).subscribe({
      next : (response) => 
      {
        this.activeStepper = response;
        this.checkApproverStatus(response);
      }
    })
   }


   checkApproverStatus(data)
   {
    data.forEach(element => {
      if(element.Owner.toLowerCase() == this.userDetails.UserId.toLowerCase())
      {
        if(element.Status == "Created" || element.Status == "Approved" || element.Status == "Rejected")
        {
          this.showDownloadAttachment = true;
          this.showApproveBtn = false;
          this.showUploadAttachment = false;
        }
        else
        {
          this.showDownloadAttachment = true;
          this.showApproveBtn = true;
          this.showUploadAttachment = false;
        }
      }
    });
   }


   getApproveCustomer()
   {
    this._focService.getApproveCustomerDetails(this.trackingNo).subscribe({
      next : (response) => 
      {
        this.focForm.patchValue(response);
      }
    })
   }

   getApproveMaterial()
   {
    this._focService.getApproveMaterialDetails(this.trackingNo).subscribe({
      next : (response) => 
      {
        this.focForm.controls.Plant.patchValue(response[0].Plant);
        response.forEach(element => {
          element.Description = element.MaterialDescription;
          element.Quantity = element.OrderQuantity;
        });
        this.focArrayForm.get('items').patchValue(response);
      }
    })
   }


  add()
  {
    const addRow = this.focArrayForm.get('items') as FormArray;
    var obj = this.getFormFields();
    addRow.push(obj);
    this.dataSource.data.push(obj.value);
    this.dataSource._updateChangeSubscription();
  }

  getFormFields()
  {
    return this._fb.group({
    MaterialNo : '',
    Description : '',
    Quantity : '',
    Amount :'',
    Currency : '',
    })
  }

 
   SortChange(SortState:Sort){
      if(SortState.direction){
        this._liveAnnouncer.announce('sorted ${SortState.direction}ending');
      }
      else{
        this._liveAnnouncer.announce('Sorted Cleared');
      }
   }

   getTrackingNo()
   {
     this._focService.getTrackingNo().subscribe({
       next : (response) => 
       {
         this.focForm.controls.TrackingNo.patchValue(response);
       }
     })
   }

   getCustomerDetailsBySold()
   {
    this._focService.getCustomerDetails(this.focForm.value.SoldToPartyName, this.focForm.value.SalesOrganization, this.focForm.value.DistributionChannel).subscribe({
      next : (response) =>
      {
        this.focForm.controls.SoldToParty.patchValue(this.focForm.value.SoldToPartyName);
        this.focForm.controls.SoldToPartyName.patchValue(response.CustomerName);
        this.soldtoPartyCurrency = response.Currency;
      },error : (err) => {
        this._commonService.openSnackbar(err, snackbarStatus.Danger);
      },
    })
   }

   getCustomerDetailsByShip()
   {
    this._focService.getCustomerDetails(this.focForm.value.ShipToPartyName, this.focForm.value.SalesOrganization, this.focForm.value.DistributionChannel).subscribe({
      next : (response) =>
      {
        this.focForm.controls.ShipToParty.patchValue(this.focForm.value.ShipToPartyName);
        this.focForm.controls.ShipToPartyName.patchValue(response.CustomerName);
      },error : (err) => {
        this._commonService.openSnackbar(err, snackbarStatus.Danger);
      },
    })
   }

   searchCustomerbySoldParty()
   {
    this.getCustomerDetailsBySold();
   }

   searchCustomerbyShipParty()
   {
    this.getCustomerDetailsByShip();
   }

   searchPlantByMaterial(i)
   {
      this.plantList = [];
      if(this.focArrayForm.controls.items.value[0].MaterialNo != null && this.focArrayForm.controls.items.value[0].MaterialNo != "")
      {
        if(this.focForm.controls.SoldToParty.valid)
        {
          //this._focService.getPlant(this.focArrayForm.controls.items.value[0].MaterialNo).subscribe({
            //next : (response) => 
            //{

              var array = this.focArrayForm.get('items') as FormArray;

              var conditionType = new ConditionType();
              conditionType.MaterialNo = this.focArrayForm.controls.items.value[i].MaterialNo;
              conditionType.SalesOrganization = this.focForm.value.SalesOrganization;
              conditionType.DistributionChannel = this.focForm.value.DistributionChannel;
              conditionType.ConditionType = this.focForm.value.ConditionType;
              conditionType.Customer = this.focForm.value.SoldToParty;


              this._focService.getMaterialDetails(this.focArrayForm.controls.items.value[i].MaterialNo, this.focForm.value.SalesOrganization, this.focForm.value.DistributionChannel, this.focForm.value.ConditionType, this.focForm.value.SoldToParty).subscribe({
                next : (response) => 
                {
                  array.controls[i].patchValue(response);
                },error : (err) => {
                  this._commonService.openSnackbar(err, snackbarStatus.Danger);
                },
              })

              // if(response.length == 1)
              // {
              //   console.log(response[0]);
              //   this.focForm.controls.Plant.patchValue(response[0]);
              //   array.controls[i].get('Currency').patchValue(this.soldtoPartyCurrency);
              // }
              // else
              // {
              //   response.forEach(element => {
              //     this.plantList.push(element);
              //   });
              //   // this.dataSource.data[i].PlantList = plantList;
              //   // this.dataSource._updateChangeSubscription();
              // }
            //},error : (err) => {
              //this._commonService.openSnackbar(err, snackbarStatus.Danger);
            //},
          //})
        }
        else
        {
          this._commonService.openSnackbar("Fill Sold To Party Field", snackbarStatus.Danger);
        }
      }
   }

    // File Upload Method
    onUploadFileChange(event)
    {
      this.files = event.target.files[0];
      this._commonService.openSnackbar("Uploaded Successfully", snackbarStatus.Success);
    }

   submit()
   {
      if(this.focForm.valid)
      {
        if(this.files)
        {
          var customerMaterial = new CustomerMaterial();
          customerMaterial.CustomerDetails = this.focForm.value;
          var quantityErrorCount = 0;
          var AmountErrorCount = 0;
          var currencyErrorCount = 0;
          var ZeroquantityErrorCount = 0;
          // console.log(this.focArrayForm.value);
          this.focArrayForm.get('items').value.forEach(element => {
            if((element.MaterialNo != null && element.MaterialNo != ""))
            {
              customerMaterial.MaterialDetails.push(element);
            }
            if(element.Quantity == null && element.Quantity == "")
            {
              quantityErrorCount++;
            }
            if(element.Quantity == "0")
            {
              ZeroquantityErrorCount++;
            }
            if(element.Amount == null && element.Amount == "")
            {
              AmountErrorCount++;
            }
            if(element.Currency == null && element.Currency == "")
            {
              currencyErrorCount++;
            }
          });
          if(this.focArrayForm.get('items').value[0].MaterialNo != null && this.focArrayForm.get('items').value[0].MaterialNo && 
          this.focArrayForm.get('items').value[0].Description != null && this.focArrayForm.get('items').value[0].Description && 
          this.focArrayForm.get('items').value[0].Quantity.trim() != null && this.focArrayForm.get('items').value[0].Quantity.trim() && 
          this.focArrayForm.get('items').value[0].Amount != null && this.focArrayForm.get('items').value[0].Amount && 
          this.focArrayForm.get('items').value[0].Currency != null && this.focArrayForm.get('items').value[0].Currency)
          {
            if(quantityErrorCount == 0 && currencyErrorCount == 0 && AmountErrorCount == 0 && ZeroquantityErrorCount == 0)
            {
              this._commonSpinner.showSpinner();
              customerMaterial.UserId = this.userDetails.UserId;
              const formData = new FormData();
              formData.append("CustomerMaterial", JSON.stringify(customerMaterial));
              formData.append(this.files.name, this.files, this.files.name);
              this._focService.saveCustomerMaterial(formData).subscribe({
                next : (response) => 
                {
                  this._commonSpinner.hideSpinner();
                  this._router.navigate(['/pages/foc-pages/dashboard']);
                  this._commonService.openSnackbar(response.Message, snackbarStatus.Success);
                },error : (err) => {
                  this._commonSpinner.hideSpinner();
                  if(err == "Tracking No is already exists")
                  {
                    this.addTracking();
                  }
                  else
                  {
                    this._commonService.openSnackbar(err, snackbarStatus.Danger);
                  }
                },
              })
            }
            else
            {
              if(quantityErrorCount > 0)
              {
                this._commonService.openSnackbar("Fill quantity field", snackbarStatus.Danger);
              }
              else if(AmountErrorCount > 0)
              {
                this._commonService.openSnackbar("Fill amount field", snackbarStatus.Danger);
              }
              else if(currencyErrorCount > 0)
              {
                this._commonService.openSnackbar("Fill currency field", snackbarStatus.Danger);
              }
              else if(ZeroquantityErrorCount > 0)
              {
                this._commonService.openSnackbar("Quantity should contain greater than 0", snackbarStatus.Danger);
              }
            }
          }
          else
          {
            this.focArrayForm.markAllAsTouched();
            this._commonService.openSnackbar("Add row in the table", snackbarStatus.Danger);
          }
        }
        else
        {
          this._commonService.openSnackbar("Attachment is Mandatory", snackbarStatus.Danger);
        }
      }
      else
      {

        const formControls = this.focForm.controls;
 
        if (formControls.SoldToParty.invalid && formControls.ShipToParty.invalid && formControls.SalesOrganization.invalid && formControls.ConditionType.invalid && formControls.DistributionChannel.invalid && formControls.Plant.invalid) {
          this.focForm.markAllAsTouched();
          this._commonService.openSnackbar("Fill Mandatory fields", snackbarStatus.Danger);
        } else {
          const invalidControl = Object.keys(formControls).find(control => formControls[control].invalid);
          
          if (invalidControl) {
            formControls[invalidControl].markAsTouched();
            this._commonService.openSnackbar(`Enter ${invalidControl} fields`, snackbarStatus.Danger);
          }
        }
      }
  }


  approve()
  {
    this._commonSpinner.showSpinner();
    this._focService.approveCustomerMaterial(this.trackingNo, this.userDetails.UserId).subscribe({
      next : (response) => 
      {
        this._commonSpinner.hideSpinner();
        this._router.navigate(['/pages/foc-pages/dashboard']);
        this._commonService.openSnackbar(response.Message, snackbarStatus.Success);
      },error : (err) => {
        this._commonSpinner.hideSpinner();
        this._commonService.openSnackbar(err, snackbarStatus.Danger);
      },
    })
  }


  reject()
  {
    this._commonSpinner.showSpinner();
    this._focService.rejectCustomerMaterial(this.trackingNo, this.userDetails.UserId,this.focForm.value.Comments).subscribe({
      next : (response) => 
      {
        this._commonSpinner.hideSpinner();
        this._router.navigate(['/pages/foc-pages/dashboard']);
        this._commonService.openSnackbar(response.Message, snackbarStatus.Success);
      },error : (err) => {
        this._commonSpinner.hideSpinner();
        this._commonService.openSnackbar(err, snackbarStatus.Danger);
      },
    })
  }

downloadAttachment()
{

this._focService.GetApprovalDocument(this.trackingNo).subscribe({
  next: async (data) =>{
    await this._fileSaver.downloadFile(data);
    this._commonService.openSnackbar("Attachment Download Successfully", snackbarStatus.Success);
  },
  error : (err) => {
    this._commonService.openSnackbar(err, snackbarStatus.Danger);
  }
 })
}



addTracking()
{
  const dialogRef = this._dialog.open(TrackingDialogComponent, {
    disableClose: true,
    backdropClass: 'userActivationDialog',
  }).afterClosed().subscribe((res) => {
    if(res == "Add")
    {
      this.getTrackingNo();
    }
  });
}




//   getCount(tableData) : void
// {
//     this.dashboardTable.allGateEntry = tableData;
//     tableData.forEach(element => {
//         if(element.status == "Active")
//         {
//             this.dashboardTable.pendingGateEntry.push(element);
//         }
//         else if(element.status == "Approved")
//         {
//             this.dashboardTable.approvedGateEntry.push(element);
//         }
//         else if(element.status == "Rejected")
//         {
//             this.dashboardTable.rejectedGateEntry.push(element);
//         }
//     });
// }

}

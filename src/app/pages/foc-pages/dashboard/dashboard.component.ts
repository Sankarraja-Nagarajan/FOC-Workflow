import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FocService } from '../../../../Services/foc.service';
import { TokenService } from '../../../../Services/token.service';
import { Router } from '@angular/router';
import { DashboardTable } from '../../../../Models/DashboardTable';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonSpinnerService } from '../../../../Services/common-spinner.service';
import { snackbarStatus } from '../../../../Enums/notification-snackbar';
import { CommonService } from '../../../../Services/common.service';
import { FileSaverService } from '../../../../Services/file-saver.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


 
 
  dataSource = new MatTableDataSource<DashboardTable>();
  activeCard : number = 0;
  userDetails : any;
  dashboardTable = new DashboardTable();
  tableData : any [] =[];
  displayedColumns : any[] = [];
  showExport : boolean  = false;
  showDownload : boolean = false;

  selection = new SelectionModel<any>(true, []);
 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
   constructor(private _focService : FocService, 
              private _tokenService : TokenService, 
              private _router : Router, 
              private _commonSpinner : CommonSpinnerService, 
              private _commonService : CommonService, 
              private _fileSaver : FileSaverService){
    

    this.userDetails = this._tokenService.decryptToken(localStorage.getItem('FocToken'));

    if(this.userDetails.Role == "I")
    {
      this.displayedColumns = ['TrackingNo', 'SalesOrganization' , 'DistributionChannel' , 'ConditionType' , 'Review'];
    }
    else
    {
      this.displayedColumns = ['TrackingNo', 'SalesOrganization' , 'DistributionChannel' , 'ConditionType' , 'Status'];
    }
    

    this.CardClicked(1);

   }

   ngOnInit()
   {
    this.getCustomerDetails();
   }
 

    /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


/** Select the Tracking Numbers */
selectTrackingNo()
{

  this.CardClicked(3);

  this.showExport = true;
  this.showDownload = true;

  this.displayedColumns = [
    'SELECET',
    'TrackingNo', 
    'SalesOrganization', 
    'DistributionChannel', 
    'ConditionType', 
    'Review'
  ];

  var data = [];
  this.tableData.forEach(element => {
    if(element.Status == "Approved")
    {
      data.push(element);
    }
  });

  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}



/** Download the Excel Format based on the selected Tracking Numbers */
download()
{
  if(this.selection.selected.length > 0)
  {

    this._commonSpinner.showSpinner();
    this.showExport = true;

    var selectedTrackingNo : number [] = [];
    this.selection.selected.forEach(element => {
      selectedTrackingNo.push(element.TrackingNo);
    });

    this._focService.downloadExcel(selectedTrackingNo).subscribe({
      next : async (response) => 
      {
        this._commonSpinner.hideSpinner();
        await this._fileSaver.downloadFile(response);
      },error : (err) => {
        this._commonSpinner.hideSpinner();
        this._commonService.openSnackbar(err, snackbarStatus.Danger);
      },
    })


  this.displayedColumns = [
    'TrackingNo', 
    'SalesOrganization', 
    'DistributionChannel', 
    'ConditionType', 
    'Review'
  ];

  this.selection.clear();
  this.showDownload = false;

  this.dataSource = new MatTableDataSource(this.tableData);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

  }
  else
  {
    this._commonService.openSnackbar("Selected Tracking No has been Download", snackbarStatus.Warning);
  }
}

/** Cancel the Downloading */
cancelDownload()
{
  this.displayedColumns = [
    'TrackingNo', 
    'SalesOrganization', 
    'DistributionChannel', 
    'ConditionType', 
    'Review'
  ];

  this.CardClicked(1);

  this.selection.clear();
  this.showDownload = false;
  this.dataSource = new MatTableDataSource(this.tableData);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}



   CardClicked(cardnumber : number){
    this.activeCard = cardnumber;
   }

   getCustomerDetails()
   {
    this._focService.getCustomerMaterialDetails(this.userDetails.UserId).subscribe({
      next : (response) => 
      {
        this.tableData = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.getCount(response);
      },error : (err) => {
        this._commonService.openSnackbar(err, snackbarStatus.Danger);
      },
    })
   }
 
   review(data)
   {
    this._router.navigate(['/pages/foc-pages/foc-screen'], {queryParams : {TrackingNo : data.TrackingNo}});
   }


   approve(data)
   {
    this._router.navigate(['/pages/foc-pages/foc-screen'], {queryParams : {TrackingNo : data.TrackingNo}});
   }

   viewStatus(data)
   {
    this._router.navigate(['/pages/foc-pages/foc-screen'], {queryParams : {TrackingNo : data.TrackingNo}});
   }

   selectStatus(status)
   {
     if(status == "All")
     {
       this.dataSource = new MatTableDataSource(this.dashboardTable.allData);
     }
     if(status == "Pending")
     {
       this.dataSource = new MatTableDataSource(this.dashboardTable.pendingData);
     }
     if(status == "Approve")
     {
       this.dataSource = new MatTableDataSource(this.dashboardTable.approvedData);
     }
     if(status == "Reject")
     {
       this.dataSource = new MatTableDataSource(this.dashboardTable.rejectedData);
     }
     this.dataSource.paginator = this.paginator;
   }

   getCount(tableData) : void
   {
       this.dashboardTable.allData = tableData;
       tableData.forEach(element => {
           if(element.Status == "Active" || element.Status == "Pending")
           {
               this.dashboardTable.pendingData.push(element);
           }
           else if(element.Status == "Approved")
           {
               this.dashboardTable.approvedData.push(element);
           }
           else if(element.Status == "Rejected")
           {
               this.dashboardTable.rejectedData.push(element);
           }
       });
      }
}

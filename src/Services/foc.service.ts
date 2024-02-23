import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocService {

  constructor(private _httpService : HttpService) { }

  getCustomerDetails(customerCode, sales, dist) : Observable<any>
  {
    return this._httpService.get(`foc/GetCustomerName?customerCode=${customerCode}&Sales=${sales}&dist=${dist}`);
  }

  getTrackingNo() : Observable<any>
  {
    const URL = `foc/GetTrackingNo`;
    return this._httpService.get(URL);
  }

  getPlant(materialNo)
  {
    return this._httpService.get(`Foc/GetPlant?materialNo=${materialNo}`);
  }

  getMaterialDetails(materialNo, sales, dist, condition, customer) : Observable<any>
  {
    return this._httpService.get(`Foc/GetDetailsByMaterialNo?materialNo=${materialNo}&sales=${sales}&dist=${dist}&condition=${condition}&customer=${customer}`);
  }

  saveCustomerMaterial(formdata) : Observable<any>
  {
    return this._httpService.postFile(`Foc/SaveCustomerMaterial`, formdata);
  }

  GetApprovalDocument(trackingNo) : Observable<any>
  {
    const URL = `Foc/GetApprovalDocument?trackingNo=${trackingNo}`;
    return this._httpService.get(URL);
  }

  getCustomerMaterialDetails(userId) : Observable<any>
  {
    return this._httpService.get(`Foc/GetCustomerMaterialDetails?userId=${userId}`);
  }

  getApproveCustomerDetails(trackingNo) : Observable<any>
  {
    return this._httpService.get(`Foc/GetApproveCustomerDetails?trackingNo=${trackingNo}`);
  }

  getApproveMaterialDetails(trackingNo) : Observable<any>
  {
    return this._httpService.get(`Foc/GetApproveMaterialDetails?trackingNo=${trackingNo}`);
  }

  approveCustomerMaterial(trackingNo, userId) : Observable<any>
  {
    return this._httpService.get(`Foc/ApproveCustomerMaterial?trackingNo=${trackingNo}&userId=${userId}`);
  }

  getApprover(trackingNo) : Observable<any>
  {
    return this._httpService.get(`Foc/GetApprovers?trackingNo=${trackingNo}`);
  }

  rejectCustomerMaterial(trackingNo, userId,comments) : Observable<any>
  {
    return this._httpService.delete(`Foc/RejectCustomerMaterial?trackingNo=${trackingNo}&userId=${userId}&comments=${comments}`);
  }

  downloadExcel(selectedTrackingNo) : Observable<any>
  {
    return this._httpService.post(`Foc/DownloadExcel`, selectedTrackingNo);
  }

}

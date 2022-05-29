import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentDetails } from 'src/app/models/component-details.model';
import { PaymentInfo } from '../models/payment.model';
import { ProcessingChargeDetails } from '../models/processing-charge.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentProcessingService {

  //baseUrl = 'https://localhost:5001/api/';

  //Uncomment the below line to connect to the kubernetes service deployed in cloud
  baseUrl = 'http://52.152.101.207/api/';

  private proceesStatusStore = new BehaviorSubject<boolean>(false);
  public proceesStatusState$ = this.proceesStatusStore.asObservable();

  constructor(private http: HttpClient) { }

  processDetail(componentDetails: ComponentDetails) : Observable<ProcessingChargeDetails>
  {
    return this.http.post<ProcessingChargeDetails>(this.baseUrl + 'componentProcessing/processDetail', componentDetails);
  }

  completeProcessing(paymentDetails: PaymentInfo) : Observable<string> {
    return this.http.post<string>(this.baseUrl + 'componentProcessing/completeProcessing', paymentDetails);
  }

  deleteRequest(requestId: number)
  {
    return this.http.delete(this.baseUrl + `componentProcessing/deleteReturnRequest/${requestId}`);
  }

  getProcessState() {
    return this.proceesStatusStore.value;
  }

  setProcessState() {
    this.proceesStatusStore.next(true);
  }

  resetProcessState() {
    this.proceesStatusStore.next(false);
  }

}

import * as apiHistory from "../api/history";
import {ResponseData} from "../models/types";
import {RequestInvoiceListOfPage} from "../models/api/request/RequestInvoiceListOfPage";
import {InvoiceListDTO} from "../models/api/response/InvoiceListDTO";
import {InvoiceDTO} from "../models/api/response/InvoiceDTO";

/**
 * Get list invoice
 *
 * @return {Promise}
 */
export function getListInvoice(cm: string, dt: RequestInvoiceListOfPage): Promise<ResponseData<InvoiceListDTO>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiHistory.getListInvoice(cm, dt);
      const lstInvoice : InvoiceDTO[] = [];
      if (response && response.data && response.data.dt && response.data.dt.listInvoice){
        response.data.dt.listInvoice.map((value: any) => {
          const invoice: InvoiceDTO = {
            invoiceId: value.invoice_id,
            invoiceCode: value.invoice_code,
            invoiceNo: value.invoice_no,
            amount: value.amount,
            amountGross: value.amount_gross,
            createDateTime: value.created_date_time,
            paymentStatus: value.payment_status,
            paymentMethod: value.payment_method,
            zptranstoken: value.zptranstoken,
            paymentDateTime: value.payment_date_time,
            staffId: value.staff_id,
            zptransid: value.zptransid,
            auditStatus: value.audit_status,
            auditBy: value.audit_by,
            auditDateTime: value.audit_date_time,
            machineName: value.machine_name
          };
          lstInvoice.push(invoice);
        })
      }
      const dat = response.data.dt;
      const data: InvoiceListDTO = {
        length: dat.length,
        listInvoice: lstInvoice,
      };
      const res : ResponseData<InvoiceListDTO> = {
        ...response.data,
        dt: data
      };

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

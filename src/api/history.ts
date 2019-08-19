import api from "../helpers/api";
import {ResponseData} from "../models/types";
import {RequestInvoiceListOfPage} from "../models/api/request/RequestInvoiceListOfPage";
import {InvoiceListDTO} from "../models/api/response/InvoiceListDTO";

/**
 * Get list invoice
 *
 * @return {Promise}
 */
export function getListInvoice(cm: string, dt: RequestInvoiceListOfPage) {
  const url = `/invoice?cm=${cm}&dt=${JSON.stringify(dt)}`;
  return api<ResponseData<InvoiceListDTO>>(
      encodeURI(url),
    "GET"
  );
}

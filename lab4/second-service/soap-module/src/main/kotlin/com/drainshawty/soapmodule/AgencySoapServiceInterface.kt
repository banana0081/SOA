package com.drainshawty.soapmodule

import com.drainshawty.ejbmodule.web.dto.FlatListDTO
import com.drainshawty.ejbmodule.web.responses.CheaperResponse
import jakarta.jws.WebMethod
import jakarta.jws.WebService

@Open
@WebService
interface AgencySoapServiceInterface {
    @WebMethod
    fun getCheaper(id1: Long, id2: Long): CheaperResponse
    @WebMethod
    fun getOrderedByTimeToMetro(page: Long?, size: Int?, byTransport: Boolean?, desc: Boolean?): FlatListDTO
}
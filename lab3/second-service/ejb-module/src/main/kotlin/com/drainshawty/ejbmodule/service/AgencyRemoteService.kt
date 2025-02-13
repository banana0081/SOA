package com.drainshawty.ejbmodule.service

import com.drainshawty.ejbmodule.web.dto.FlatListDTO
import com.drainshawty.ejbmodule.web.responses.CheaperResponse
import jakarta.ejb.Remote


@Remote
interface AgencyRemoteService {
    fun getCheaper(id1: Long, id2: Long): CheaperResponse
    fun getOrderedByTimeToMetro(page: Long, size: Int, byTransport: Boolean, desc: Boolean): FlatListDTO
}
package com.drainshawty.soapmodule

import com.drainshawty.ejbmodule.service.AgencyService
import com.drainshawty.ejbmodule.web.dto.FlatListDTO
import com.drainshawty.ejbmodule.web.responses.CheaperResponse
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.jws.WebService

@Open
@ApplicationScoped
@WebService(
    endpointInterface = "com.drainshawty.soapmodule.AgencySoapServiceInterface",
)
class AgencySoapService : AgencySoapServiceInterface {

    @Inject
    private lateinit var agencyService: AgencyService

    override fun getCheaper(id1: Long, id2: Long): CheaperResponse {
        return agencyService.getCheaper(id1, id2)
    }

    override fun getOrderedByTimeToMetro(page: Long?, size: Int?, byTransport: Boolean?, desc: Boolean?): FlatListDTO {
        return agencyService.getOrderedByTimeToMetro(
            page ?: 1,
            size ?: 10,
            byTransport ?: false,
            desc ?: false
        )
    }
}
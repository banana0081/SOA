package com.drainshawty.ejbmodule.service


import com.drainshawty.ejbmodule.client.FlatsClient
import com.drainshawty.ejbmodule.web.dto.FlatListDTO
import com.drainshawty.ejbmodule.web.responses.CheaperResponse
import jakarta.ejb.Stateless
import jakarta.inject.Inject
import jakarta.ws.rs.InternalServerErrorException


@Stateless
class AgencyService : AgencyRemoteService {

    @Inject
    private lateinit var flatsClient: FlatsClient

    override fun getCheaper(id1: Long, id2: Long): CheaperResponse {
        val flat1 = flatsClient.getFlatById(id1)
        val flat2 = flatsClient.getFlatById(id2)
        val cheaperFlat = requireNotNull(flat1) { "Flat with ID $id1 not found" }
            .let { first ->
                requireNotNull(flat2) { "Flat with ID $id2 not found" }
                listOf(first, flat2).minByOrNull { it.price ?: Int.MAX_VALUE }
                    ?: throw IllegalArgumentException("Both flats are missing prices")
            }
        return CheaperResponse(cheaperFlat.id, cheaperFlat.name, cheaperFlat.price)
    }

    override fun getOrderedByTimeToMetro(page: Long, size: Int, byTransport: Boolean, desc: Boolean): FlatListDTO {
        val sortField = if (byTransport) "timeToMetroByTransport" else "timeToMetroByWalk"
        val sortOrder = if (desc) "-$sortField" else sortField
        val params = "page=$page&size=$size&sort=$sortOrder"
        val flats = flatsClient.getAllFlats(params)
        if (flats != null) return flats
        throw InternalServerErrorException("Something went wrong")
    }
}
package com.drainshawty.secondservice.service


import com.drainshawty.secondservice.client.FlatsClient
import com.drainshawty.secondservice.web.dto.FlatListDTO
import com.drainshawty.secondservice.web.responses.CheaperResponse
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.InternalServerErrorException


@ApplicationScoped
class AgencyService @Inject constructor(
    private val flatsClient: FlatsClient,
) {
    fun getCheaper(id1: Long, id2: Long): CheaperResponse {
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

    fun getOrderedByTimeToMetro(page: Long, size: Int, byTransport: Boolean, desc: Boolean): FlatListDTO {
        val sortField = if (byTransport) "timeToMetroByTransport" else "timeToMetroByWalk"
        val sortOrder = if (desc) "-$sortField" else sortField
        val params = "page=$page&size=$size&sort=$sortOrder"
        val flats = flatsClient.getAllFlats(params)
        if (flats != null) return flats
        throw InternalServerErrorException("Something went wrong")
    }
}
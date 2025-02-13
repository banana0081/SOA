package com.drainshawty.firstservice.web.resource

import com.drainshawty.firstservice.service.FlatService
import com.drainshawty.firstservice.web.dto.FlatDTO
import com.drainshawty.firstservice.web.dto.FlatListDTO
import jakarta.enterprise.context.RequestScoped
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response

@Path("/flats")
@RequestScoped
class FlatResource @Inject constructor(private val flatService: FlatService) {

    @GET
    @Produces(MediaType.APPLICATION_XML)
    fun getAllFlats(
        @QueryParam("page") page: Long? = 1,
        @QueryParam("size") size: Int? = 10,
        @QueryParam("sort") sort: List<String>? = emptyList(),
        @QueryParam("filter") filter: List<String>? = emptyList()
    ): Response {
        val flats = flatService.getAllFlats(
            page ?: 1,
            size ?: 10,
            sort ?: emptyList(),
            filter ?: emptyList()
        )
        val count =  flatService.countAllFlats(
            sort ?: emptyList(),
            filter ?: emptyList()
        )
        if (flats.isEmpty()) return Response.status(Response.Status.NO_CONTENT).build()
        return Response.ok(FlatListDTO(flats, count)).build()
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_XML)
    fun getFlatById(@PathParam("id") flatId: Int): Response {
        val flat = flatService.getFlatById(flatId)
        return Response.ok(flat).build()
    }

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    fun addFlat(flatDTO: FlatDTO): Response {
        return Response.status(Response.Status.CREATED).entity(flatService.addFlat(flatDTO)).build()
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    fun updateFlat(@PathParam("id") flatId: Int, flatDTO: FlatDTO): Response {
        return Response.ok(flatService.updateFlat(flatId, flatDTO)).build()
    }

    @DELETE
    @Path("/{id}")
    fun deleteFlat(@PathParam("id") flatId: Int): Response {
        val deleted = flatService.deleteFlat(flatId)
        return if (deleted) Response.status(Response.Status.NO_CONTENT).build()
        else Response.status(Response.Status.NOT_FOUND).entity("Flat not found").build()
    }

    @GET
    @Path("/rooms/sum")
    @Produces(MediaType.APPLICATION_XML)
    fun getSumOfRooms(): Response {
        val sumOfRooms = flatService.getSumOfRooms()
        return Response.ok(sumOfRooms).build()
    }

    @GET
    @Path("/metro/average")
    @Produces(MediaType.APPLICATION_XML)
    fun getAverageTimeToMetro(): Response {
        val averageTime = flatService.getAvgTimeToMetro()
        return Response.ok(averageTime).build()
    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_XML)
    fun searchFlats(
        @QueryParam("query") query: String,
        @QueryParam("page") page: Long? = 1,
        @QueryParam("size") size: Int? = 10,
        @QueryParam("sort") sort: List<String>? = emptyList(),
        @QueryParam("filter") filter: List<String>? = emptyList()
    ): Response {
        val flats = flatService.searchFlatsByName(
            query,
            page ?: 1,
            size ?: 10,
            sort ?: emptyList(),
            filter ?: emptyList()
        )
        val count = flatService.countSearch(
            query,
            sort ?: emptyList(),
            filter ?: emptyList()
        )
        if (flats.isEmpty()) return Response.status(Response.Status.NO_CONTENT).build()
        return Response.ok(FlatListDTO(flats, count)).build()
    }
}
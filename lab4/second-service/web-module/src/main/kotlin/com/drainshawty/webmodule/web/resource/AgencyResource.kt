package com.drainshawty.webmodule.web.resource

import com.drainshawty.soapmodule.AgencySoapServiceInterface
import jakarta.enterprise.context.RequestScoped
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response


@Path("/agency")
@RequestScoped
class AgencyResource {

    @Inject
    private lateinit var agencySoapService: AgencySoapServiceInterface

    @GET
    @Path("/get-cheaper/{id1}/{id2}")
    @Produces(MediaType.APPLICATION_XML)
    fun getCheaper(@PathParam("id1") id1: Long, @PathParam("id2") id2: Long): Response {
        val cheaperFlat = agencySoapService.getCheaper(id1, id2)
        return Response.ok(cheaperFlat).build()
    }

    @GET
    @Path("/get-ordered-by-time-to-metro/{by-transport}/{desc}")
    @Produces(MediaType.APPLICATION_XML)
    fun getOrderedByTimeToMetro(
        @QueryParam("page") page: Long? = 1,
        @QueryParam("size") size: Int? = 10,
        @PathParam("by-transport") byTransport: Boolean? = false,
        @PathParam("desc") desc: Boolean? = false
    ): Response {
        return Response.ok(agencySoapService.getOrderedByTimeToMetro(
            page ?: 1,
            size ?: 10,
            byTransport ?: false,
            desc ?: false)
        ).build()
    }
}
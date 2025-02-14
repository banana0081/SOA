package com.drainshawty.webmodule.web.errormappers

import com.drainshawty.webmodule.web.responses.ErrorResponse
import jakarta.ws.rs.BadRequestException
import jakarta.ws.rs.InternalServerErrorException
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
@Produces(MediaType.APPLICATION_XML)
class InternalServerErrorProvider : ExceptionMapper<InternalServerErrorException> {
    override fun toResponse(exception: InternalServerErrorException): Response {
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
            .entity(
                ErrorResponse(
                    Response.Status.INTERNAL_SERVER_ERROR.statusCode,
                    exception.message ?: "Internal server error"
                )
            )
            .build()
    }
}
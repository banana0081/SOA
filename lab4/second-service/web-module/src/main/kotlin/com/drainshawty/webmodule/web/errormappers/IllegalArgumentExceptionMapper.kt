package com.drainshawty.webmodule.web.errormappers

import com.drainshawty.webmodule.web.responses.ErrorResponse
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
@Produces(MediaType.APPLICATION_XML)
class IllegalArgumentExceptionMapper : ExceptionMapper<IllegalArgumentException> {
    override fun toResponse(exception: IllegalArgumentException): Response {
        return Response.status(Response.Status.BAD_REQUEST)
            .entity(
                ErrorResponse(
                    Response.Status.BAD_REQUEST.statusCode,
                    exception.message ?: "Incorrect request. Check parameters."
                )
            )
            .build()
    }
}
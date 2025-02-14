package com.drainshawty.webmodule.web.errormappers

import com.drainshawty.webmodule.web.responses.ErrorResponse
import jakarta.ws.rs.NotFoundException
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
@Produces(MediaType.APPLICATION_XML)
class NotFoundExceptionMapper : ExceptionMapper<NotFoundException> {
    override fun toResponse(exception: NotFoundException): Response {
        return Response.status(Response.Status.NOT_FOUND)
            .entity(
                ErrorResponse(
                    Response.Status.NOT_FOUND.statusCode,
                    "Ресурс не найден. Проверьте корректность URL или параметров запроса."
                )
            )
            .build()
    }
}
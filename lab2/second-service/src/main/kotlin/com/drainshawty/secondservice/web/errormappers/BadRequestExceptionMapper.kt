package com.drainshawty.secondservice.web.errormappers

import com.drainshawty.secondservice.web.responses.ErrorResponse
import jakarta.ws.rs.BadRequestException
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
@Produces(MediaType.APPLICATION_XML)
class BadRequestExceptionMapper : ExceptionMapper<BadRequestException> {
    override fun toResponse(exception: BadRequestException): Response {
        return Response.status(Response.Status.BAD_REQUEST)
            .entity(
                ErrorResponse(
                    Response.Status.BAD_REQUEST.statusCode,
                    exception.message ?: "Некорректный запрос. Проверьте параметры."
                )
            )
            .build()
    }
}
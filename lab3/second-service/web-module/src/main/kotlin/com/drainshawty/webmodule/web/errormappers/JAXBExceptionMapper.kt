package com.drainshawty.webmodule.web.errormappers

import com.drainshawty.webmodule.web.responses.ErrorResponse
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider
import jakarta.xml.bind.UnmarshalException

@Provider
@Produces(MediaType.APPLICATION_XML)
class JAXBExceptionMapper : ExceptionMapper<UnmarshalException> {
    override fun toResponse(exception: UnmarshalException?): Response {
        // Проверка на тип ошибки и создание кастомного ответа
        val errorMessage = "Некорректный запрос, возможно неверный ID или формат данных."
        return Response.status(Response.Status.BAD_REQUEST)
            .entity(ErrorResponse(code = 400, message = errorMessage))
            .build()
    }
}
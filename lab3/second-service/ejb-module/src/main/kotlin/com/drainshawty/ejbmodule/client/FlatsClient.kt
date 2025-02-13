package com.drainshawty.ejbmodule.client

import com.drainshawty.ejbmodule.web.dto.FlatDTO
import com.drainshawty.ejbmodule.web.dto.FlatListDTO
import com.drainshawty.ejbmodule.web.responses.ErrorResponse
import jakarta.enterprise.context.ApplicationScoped
import jakarta.ws.rs.BadRequestException
import jakarta.ws.rs.NotFoundException
import jakarta.ws.rs.client.Client
import jakarta.ws.rs.client.ClientBuilder
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.jboss.logging.processor.apt.ProcessingException

@ApplicationScoped
class FlatsClient {
    private val serviceUrl = "http://localhost:8080"
    private var client: Client? = null

    fun getFlatById(id: Long): FlatDTO? {
        val url = "$serviceUrl/flats/$id"
        return try {
            client = ClientBuilder.newClient()
            val response: Response = client!!.target(url).request(MediaType.APPLICATION_XML).get()
            if (response.status == Response.Status.NOT_FOUND.statusCode) return null
            if (response.status == Response.Status.BAD_REQUEST.statusCode) return null
            val flat: FlatDTO = response.readEntity(FlatDTO::class.java)
            client!!.close()
            flat
        } catch (e: ProcessingException) {
            null
        }
    }

    fun getAllFlats(params: String): FlatListDTO? {
        val url = "$serviceUrl/flats?$params"
        return try {
            client = ClientBuilder.newClient()
            val response: Response = client!!.target(url).request(MediaType.APPLICATION_XML).get()
            if (response.status == Response.Status.NOT_FOUND.statusCode)
                throw NotFoundException(response.readEntity(ErrorResponse::class.java).message)
            if (response.status == Response.Status.BAD_REQUEST.statusCode)
                throw BadRequestException(response.readEntity(ErrorResponse::class.java).message)
            val flats: FlatListDTO = response.readEntity(FlatListDTO::class.java)
            client!!.close()
            flats
        } catch (e: ProcessingException) {
            null
        }
    }
}
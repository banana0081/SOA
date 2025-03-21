package com.drainshawty.secondservice.web.filter

import com.drainshawty.secondservice.annotation.Open
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import jakarta.ws.rs.container.ContainerResponseContext
import jakarta.ws.rs.container.ContainerResponseFilter
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.Provider

@Provider
@Open
class CorsFilter : ContainerRequestFilter, ContainerResponseFilter {

    /**
     * Method for ContainerRequestFilter.
     */
    override fun filter(request: ContainerRequestContext) {
        // If it's a preflight request, we abort the request with
        // a 200 status, and the CORS headers are added in the
        // response filter method below.
        if (isPreflightRequest(request)) {
            request.abortWith(Response.ok().build())
            return
        }
    }

    /**
     * A preflight request is an OPTIONS request with an Origin header.
     */
    private fun isPreflightRequest(request: ContainerRequestContext): Boolean {
        return request.getHeaderString("Origin") != null &&
                request.method.equals("OPTIONS", ignoreCase = true)
    }

    /**
     * Method for ContainerResponseFilter.
     */
    override fun filter(request: ContainerRequestContext, response: ContainerResponseContext) {
        // If there is no Origin header, then it is not a cross-origin request. We don't do anything.
        if (request.getHeaderString("Origin") == null) {
            return
        }

        // If it is a preflight request, then we add all the CORS headers here.
        if (isPreflightRequest(request)) {
            response.headers.add("Access-Control-Allow-Credentials", "true")
            response.headers.add(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS, HEAD"
            )
            response.headers.add(
                "Access-Control-Allow-Headers",
                "X-Requested-With, Authorization, Accept-Version, Content-MD5, CSRF-Token, Content-Type"
            )
        }

        // Cross-origin requests can be either simple requests or preflight requests.
        // We need to add this header to both types of requests.
        response.headers.add("Access-Control-Allow-Origin", "*")
    }
}
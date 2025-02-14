package com.drainshawty.firstservice.jersey

import com.drainshawty.firstservice.web.filter.CorsFilter
import jakarta.ws.rs.ApplicationPath
import org.glassfish.jersey.media.multipart.MultiPartFeature
import org.glassfish.jersey.server.ResourceConfig
import org.springframework.context.annotation.Configuration


@Configuration
@ApplicationPath("/")
class JerseyConfig : ResourceConfig() {
    init {
        packages("com.drainshawty.firstservice.web.resource")
        register(CorsFilter::class.java)
        register(MultiPartFeature::class.java)
    }
}
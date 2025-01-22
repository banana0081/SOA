package com.drainshawty.firstservice

import com.drainshawty.firstservice.storage.Exposed
import jakarta.ws.rs.ApplicationPath
import jakarta.ws.rs.core.Application


@ApplicationPath("")
class App : Application() {
    init {
        Exposed.register()
    }
}
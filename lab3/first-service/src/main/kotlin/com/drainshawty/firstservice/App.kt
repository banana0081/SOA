package com.drainshawty.firstservice

import com.drainshawty.firstservice.jersey.JerseyConfig
import com.drainshawty.firstservice.storage.Exposed
import org.glassfish.jersey.server.ResourceConfig

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean

@SpringBootApplication
class App : SpringBootServletInitializer() {}

fun main(args: Array<String>) {
    Exposed.register()
    SpringApplication.run(App::class.java, *args)
}

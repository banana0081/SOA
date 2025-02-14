package com.drainshawty.soapmodule

import jakarta.ws.rs.ApplicationPath
import jakarta.ws.rs.core.Application
import jakarta.xml.ws.Endpoint
import java.lang.management.ManagementFactory
import javax.management.ObjectName


@Open
@ApplicationPath("")
class App : Application() {

    fun main(args: Array<String>) {
        val mBeanServer = ManagementFactory.getPlatformMBeanServer()
        val objectName = ObjectName("jboss.as:domain=core-service,host=default-server,port=public")

        val port = mBeanServer.getAttribute(objectName, "http-interface") as String

        Endpoint.publish("http://localhost:${port}/AgencySoapService", AgencySoapService())
    }
}
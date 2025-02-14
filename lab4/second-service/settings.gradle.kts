pluginManagement {
    plugins {
        kotlin("jvm") version "2.1.10"
    }
}
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"
}
rootProject.name = "second-service"
include("web-module")
include("ejb-module")
include("soap-module")

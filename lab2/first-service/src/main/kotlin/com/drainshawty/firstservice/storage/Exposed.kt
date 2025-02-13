package com.drainshawty.firstservice.storage

import com.drainshawty.firstservice.storage.coordinates.CoordinatesTable
import com.drainshawty.firstservice.storage.flat.FlatTable
import com.drainshawty.firstservice.storage.house.HouseTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

class Exposed {

    companion object {
        fun register() {
            Database.connect(
                "jdbc:postgresql://localhost:5432/postgres",
                driver = "org.postgresql.Driver",
                user = "postgres",
                password = "root"
            )
            transaction {
                SchemaUtils.create(CoordinatesTable)
                SchemaUtils.create(HouseTable)
                SchemaUtils.create(FlatTable)
            }
        }
    }
}
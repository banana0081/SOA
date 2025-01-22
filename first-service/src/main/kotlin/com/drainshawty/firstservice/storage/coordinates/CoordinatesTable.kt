package com.drainshawty.firstservice.storage.coordinates

import org.jetbrains.exposed.dao.id.IntIdTable


object CoordinatesTable : IntIdTable("coordinates") {
    val x = float("x")
    val y = integer("y").check { it greater -650 }
}
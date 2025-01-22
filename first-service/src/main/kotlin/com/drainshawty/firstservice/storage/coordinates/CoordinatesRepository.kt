package com.drainshawty.firstservice.storage.coordinates

import com.drainshawty.firstservice.web.dto.CoordinatesDTO
import jakarta.enterprise.context.ApplicationScoped
import org.jetbrains.exposed.sql.transactions.transaction

@ApplicationScoped
class CoordinatesRepository {

    fun addCoordinates(coordinatesDTO: CoordinatesDTO): CoordinatesEntity {
        return transaction {
            CoordinatesEntity.new {
                this.x = coordinatesDTO.x
                this.y = coordinatesDTO.y
            }
        }
    }
}
package com.drainshawty.firstservice.service


import com.drainshawty.firstservice.storage.flat.FlatRepository
import com.drainshawty.firstservice.util.FilterCond
import com.drainshawty.firstservice.util.FilterType
import com.drainshawty.firstservice.web.dto.FlatDTO
import com.drainshawty.firstservice.web.responses.AverageTimeResponse
import com.drainshawty.firstservice.web.responses.TotalRoomsResponse
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.validation.Validator
import jakarta.ws.rs.BadRequestException
import jakarta.ws.rs.NotFoundException
import org.jetbrains.exposed.sql.transactions.transaction

@ApplicationScoped
class FlatService @Inject constructor(
    private val flatRepository: FlatRepository,
    private val validator: Validator
) {

    private fun parseSort(sort: List<String>): List<Pair<String, Boolean>> {
        return sort
            .filter { it.isNotBlank() }
            .map {
                if (it.startsWith("-")) {
                    Pair(it.substring(1), true)
                } else {
                    Pair(it, false)
                }
            }
    }



    fun parseFilter(filter: List<String>): List<FilterCond> {
        return filter
            .filter { it.isNotBlank() }
            .map { condition ->
                val (field, value) = condition.split(Regex("[=<>]")).map { it.trim() }
                val type = when {
                    "=" in condition -> FilterType.EQUALS
                    "<" in condition -> FilterType.LESS
                    ">" in condition -> FilterType.GREATER
                    else -> throw BadRequestException("Invalid filter condition: $condition")
                }
                FilterCond(field, type, value)
            }
    }

    fun countAllFlats(sort: List<String>, filter: List<String>): Int = transaction {
        flatRepository.countTotal(parseSort(sort), parseFilter(filter))
    }

    fun getAllFlats(page: Long, size: Int, sort: List<String>, filter: List<String>): List<FlatDTO> = transaction {
        if (page <= 0) throw BadRequestException("Param 'page' has to be greater or equals 1.")
        if (size <= 0) throw BadRequestException("Param 'size' has to be greater than 0.")
        flatRepository.getAllFlats(page-1, size, parseSort(sort), parseFilter(filter)).map { it.toDTO() }
    }

    fun getFlatById(flatId: Int): FlatDTO = transaction {
        if (flatId <= 0) throw BadRequestException("Идентификатор квартиры должен быть положительным числом.")
        flatRepository.getFlatById(flatId)?.toDTO()
            ?: throw NotFoundException("Flat with ID $flatId not found.")
    }

    fun addFlat(flatDTO: FlatDTO): FlatDTO = transaction {
        validateFlatDTO(flatDTO)
        flatRepository.addFlat(flatDTO).toDTO()
    }

    fun updateFlat(flatId: Int, flatDTO: FlatDTO): FlatDTO = transaction {
        if (flatId <= 0) throw BadRequestException("ID has to be greater than 0.")
        validateFlatDTO(flatDTO)
        flatRepository.updateFlat(flatId, flatDTO)?.toDTO()
            ?: throw NotFoundException("Flat with ID $flatId not found.")
    }

    fun deleteFlat(flatId: Int): Boolean = transaction {
        if (flatId <= 0) throw BadRequestException("ID has to be greater than 0.")
        val deleted = flatRepository.deleteFlat(flatId)
        if (!deleted) throw NotFoundException("Flat with ID $flatId not found.")
        true
    }

    fun getSumOfRooms(): TotalRoomsResponse = transaction {
        TotalRoomsResponse(flatRepository.getSumOfRooms())
    }

    fun getAvgTimeToMetro(): AverageTimeResponse = transaction {
        AverageTimeResponse(flatRepository.getAvgTimeToMetro())
    }

    fun searchFlatsByName(name: String, page: Long, size: Int, sort: List<String>, filter: List<String>): List<FlatDTO> = transaction {
        if (name.isBlank()) throw BadRequestException("Name can't be empty.")
        if (page <= 0) throw BadRequestException("Param 'page' has to be greater or equals 1.")
        if (size <= 0) throw BadRequestException("Param 'size' has to be greater than 0.")
        flatRepository.searchFlatsByName(name, page-1, size, parseSort(sort), parseFilter(filter)).map { it.toDTO() }
    }

    fun countSearch(name: String, sort: List<String>, filter: List<String>): Int = transaction {
        if (name.isBlank()) throw BadRequestException("Parameter can't be empty.")
        flatRepository.countTotalSearch(name, parseSort(sort), parseFilter(filter))
    }

    fun validateFlatDTO(flatDTO: FlatDTO) {
        val violations = validator.validate(flatDTO)
        if (violations.isNotEmpty()) {
            val message = violations.joinToString(", ") { it.message }
            throw BadRequestException("Validation error: $message")
        }
    }
}
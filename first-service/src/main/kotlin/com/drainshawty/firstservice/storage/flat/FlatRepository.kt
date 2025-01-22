package com.drainshawty.firstservice.storage.flat

import com.drainshawty.firstservice.storage.coordinates.CoordinatesRepository
import com.drainshawty.firstservice.storage.coordinates.CoordinatesTable
import com.drainshawty.firstservice.storage.furnish.Furnish
import com.drainshawty.firstservice.storage.house.HouseRepository
import com.drainshawty.firstservice.storage.house.HouseTable
import com.drainshawty.firstservice.util.FilterCond
import com.drainshawty.firstservice.util.FilterType
import com.drainshawty.firstservice.web.dto.FlatDTO
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import kotlinx.datetime.LocalDateTime
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.greater
import org.jetbrains.exposed.sql.SqlExpressionBuilder.greaterEq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.lessEq
import org.jetbrains.exposed.sql.transactions.transaction

@ApplicationScoped
class FlatRepository @Inject constructor(
    private val coordinatesRepository: CoordinatesRepository,
    private val houseRepository: HouseRepository
) {

    private fun processQuery(
        sort: List<Pair<String, Boolean>> = emptyList(),
        filters: List<FilterCond> = emptyList()
    ): Query {
        val query = FlatTable.innerJoin(CoordinatesTable).innerJoin(HouseTable).selectAll()
        filters.forEach { filter ->
            query.andWhere { filterType(filter) }
        }

        sort.forEach { (field, isDescending) ->
            query.orderBy(Pair(
                matchField(field), if (isDescending) SortOrder.DESC else SortOrder.ASC)
            )
        }
        return query
    }

    private val fieldMapping: Map<String, Column<out Comparable<*>?>> = mapOf(
        "name" to FlatTable.name,
        "numberOfRooms" to FlatTable.numberOfRooms,
        "area" to FlatTable.area,
        "creationDate" to FlatTable.creationDate,
        "timeToMetroByTransport" to FlatTable.timeToMetroByTransport,
        "timeToMetroByWalk" to FlatTable.timeToMetroByWalk,
        "centralHeating" to FlatTable.centralHeating,
        "furnish" to FlatTable.furnish,
        "creationDate" to FlatTable.creationDate,
        "coordinates.x" to CoordinatesTable.x,
        "coordinates.y" to CoordinatesTable.y,
        "price" to FlatTable.price,
        "timeToMetroByWalk" to FlatTable.timeToMetroByWalk,
        "house.name" to HouseTable.name,
        "house.year" to HouseTable.year,
        "house.numberOfFlatsOnFloor" to HouseTable.numberOfFlatsOnFloor
    )

    private fun matchField(field: String): Column<*> {
        return fieldMapping[field]
            ?: throw IllegalArgumentException("Invalid field: $field")
    }

    private fun filterType(filter: FilterCond): Op<Boolean> {
        when {
            listOf("name", "house.name").contains(filter.field) -> {
                val col = matchField(filter.field) as Column<String>
                val value = filter.value
                return when(filter.filterType) {
                    FilterType.EQUALS -> col eq value
                    FilterType.GREATER -> col greaterEq  value
                    FilterType.LESS -> col lessEq  value
                }
            }
            listOf("area", "coordinates.y", "price",
                "timeToMetroByTransport", "timeToMetroByWalk",
                "house.year", "house.numberOfFlatsOnFloor").contains(filter.field) -> {
                val col = matchField(filter.field) as Column<Long>
                val value = filter.value.toLong()
                return when(filter.filterType) {
                    FilterType.EQUALS -> col eq value
                    FilterType.GREATER -> col greaterEq  value
                    FilterType.LESS -> col lessEq  value
                }
            }
            listOf("coordinates.x").contains(filter.field) -> {
                val col = matchField(filter.field) as Column<Double>
                val value = filter.value.toDouble()
                return when(filter.filterType) {
                    FilterType.EQUALS -> col eq value
                    FilterType.GREATER -> col greater  value
                    FilterType.LESS -> col lessEq  value
                }
            }
            listOf("centralHeating").contains(filter.field) -> {
                val col = matchField(filter.field) as Column<Boolean>
                val value = filter.value.toBoolean()
                return when(filter.filterType) {
                    FilterType.EQUALS -> col eq value
                    FilterType.GREATER -> col greaterEq  value
                    FilterType.LESS -> col lessEq  value
                }
            }
            listOf("furnish").contains(filter.field) -> {
                val col = matchField(filter.field) as Column<Furnish>
                val value = when(filter.value) {
                    "none" -> Furnish.NONE
                    "designer" -> Furnish.DESIGNER
                    "fine" -> Furnish.FINE
                    else -> throw IllegalArgumentException("Invalid furnish: ${filter.value}")
                }
                return when(filter.filterType) {
                    FilterType.EQUALS -> col eq value
                    FilterType.GREATER -> col greaterEq  value
                    FilterType.LESS -> col lessEq  value
                }
            }
            listOf("creationDate").contains(filter.field) -> {
                val col = matchField(filter.field) as Column<LocalDateTime>
                val value = LocalDateTime.parse(filter.value)
                return when(filter.filterType) {
                    FilterType.EQUALS -> col eq value
                    FilterType.GREATER -> col greaterEq value
                    FilterType.LESS -> col lessEq value
                }
            }

            else -> throw IllegalArgumentException("Invalid field: ${filter.field}")
        }

    }

    fun countTotal(sort: List<Pair<String, Boolean>> = emptyList(),
                   filters: List<FilterCond> = emptyList()
    ): Int = transaction {

        val query = processQuery(sort, filters)

        query
            .toList().map { row ->
                FlatEntity.wrapRow(row)
            }.count()
    }

    fun getAllFlats(
        page: Long = 0,
        pageSize: Int = 10,
        sort: List<Pair<String, Boolean>> = emptyList(),
        filters: List<FilterCond> = emptyList()
    ): List<FlatEntity> = transaction {

        val query = processQuery(sort, filters)

        query
            .limit(pageSize)
            .offset(page* pageSize)
            .toList().map { row ->
                FlatEntity.wrapRow(row)
            }
    }

    fun getFlatById(flatId: Int): FlatEntity? = transaction { FlatEntity.findById(flatId) }


    fun addFlat(flatDTO: FlatDTO): FlatEntity {
        return transaction {
            val coordinates = coordinatesRepository.addCoordinates(flatDTO.coordinates)
            val house = houseRepository.addHouse(flatDTO.house)

            FlatEntity.new {
                this.price = flatDTO.price
                this.name = flatDTO.name
                this.coordinates = coordinates
                this.area = flatDTO.area
                this.numberOfRooms = flatDTO.numberOfRooms
                this.timeToMetroByWalk = flatDTO.timeToMetroByWalk
                this.timeToMetroByTransport = flatDTO.timeToMetroByTransport
                this.centralHeating = flatDTO.centralHeating
                this.furnish = flatDTO.furnish.toFurnish()
                this.house = house
            }
        }
    }


    fun updateFlat(flatId: Int, flatDTO: FlatDTO): FlatEntity? {
        return transaction {
            val flat = FlatEntity.findById(flatId)
            flat?.apply {
                this.price = flatDTO.price
                this.name = flatDTO.name
                this.area = flatDTO.area
                this.numberOfRooms = flatDTO.numberOfRooms
                this.timeToMetroByWalk = flatDTO.timeToMetroByWalk
                this.timeToMetroByTransport = flatDTO.timeToMetroByTransport
                this.centralHeating = flatDTO.centralHeating
                this.furnish = flatDTO.furnish.toFurnish()
                this.coordinates.x = flatDTO.coordinates.x
                this.coordinates.y = flatDTO.coordinates.y
                this.house.name = flatDTO.house.name
                this.house.year = flatDTO.house.year
                this.house.numberOfFlatsOnFloor = flatDTO.house.numberOfFlatsOnFloor
            }
            flat
        }
    }

    fun deleteFlat(flatId: Int): Boolean = transaction {
        FlatEntity.findById(flatId)?.let {
            it.delete()
            true
        } ?: false
    }

    fun getSumOfRooms(): Int = transaction {
        FlatTable
            .selectAll()
            .sumOf { it[FlatTable.numberOfRooms] }
    }

    fun getAvgTimeToMetro(): Double = transaction {
        FlatTable
            .selectAll()
            .map { it[FlatTable.timeToMetroByTransport] }
            .average()
    }

    fun searchFlatsByName(
        searchQuery: String,
        page: Long = 0,
        pageSize: Int = 10,
        sort: List<Pair<String, Boolean>> = emptyList(),
        filters: List<FilterCond> = emptyList()
    ): List<FlatEntity> = transaction {

        val query = processQuery(sort, filters)

        query
            .limit(pageSize)
            .offset(page* pageSize)
            .andWhere { FlatTable.name.lowerCase() like  "%${searchQuery.lowercase()}%" }
            .map { row ->
                println(row)
                FlatEntity.wrapRow(row)
            }
    }

    fun countTotalSearch(
        searchQuery: String,
        sort: List<Pair<String, Boolean>> = emptyList(),
        filters: List<FilterCond> = emptyList()
    ): Int = transaction {

        val query = processQuery(sort, filters)

        query
            .andWhere { FlatTable.name.lowerCase() like  "%${searchQuery.lowercase()}%" }
            .map { row ->
                println(row)
                FlatEntity.wrapRow(row)
            }.count()
    }
}
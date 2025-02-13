package com.drainshawty.firstservice.util

data class FilterCond(
    val field: String,
    val filterType: FilterType,
    val value: String
)

enum class FilterType {
    EQUALS, GREATER, LESS;
}
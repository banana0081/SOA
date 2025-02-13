package com.drainshawty.ejbmodule.web.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.xml.bind.annotation.XmlAccessType
import jakarta.xml.bind.annotation.XmlAccessorType
import jakarta.xml.bind.annotation.XmlElement
import jakarta.xml.bind.annotation.XmlRootElement

@XmlRootElement(name = "FlatRequest")
@XmlAccessorType(XmlAccessType.FIELD)
data class FlatDTO(
    @XmlElement(required = false) val id: Int,

    @XmlElement @field:NotBlank(message = "The field 'name' cannot be blank.")
    val name: String,

    @XmlElement(name = "coordinates") @field:NotNull(message = "The field 'coordinates' cannot be null.")
    val coordinates: CoordinatesDTO,

    @XmlElement(required = false) val creationDate: String?,

    @XmlElement @field:NotNull(message = "The field 'area' cannot be null.")
    val area: Long,

    @XmlElement @field:NotNull(message = "The field 'numberOfRooms' cannot be null.")
    val numberOfRooms: Int,

    @XmlElement @field:NotNull(message = "The field 'timeToMetroByTransport' cannot be null.")
    val timeToMetroByTransport: Long,

    @XmlElement @field:NotNull(message = "The field 'timeToMetroByWalk' cannot be null.")
    val timeToMetroByWalk: Int,

    @XmlElement @field:NotNull(message = "The field 'centralHeating' cannot be null.")
    val centralHeating: Boolean,

    @XmlElement(name = "furnish") @field:NotNull(message = "The field 'furnish' cannot be null.")
    val furnish: FurnishDTO,

    @XmlElement(name = "house") @field:NotNull(message = "The field 'house' cannot be null.")
    val house: HouseDTO,

    @XmlElement @field:NotNull(message = "The field 'price' cannot be null.")
    val price: Int
)
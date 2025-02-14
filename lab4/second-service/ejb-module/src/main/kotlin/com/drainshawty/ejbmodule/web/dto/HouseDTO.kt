package com.drainshawty.ejbmodule.web.dto

import jakarta.xml.bind.annotation.*


@XmlRootElement(name = "house")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = ["name", "year", "numberOfFlatsOnFloor"])  // Порядок следования
data class HouseDTO(
    @XmlElement val name: String,
    @XmlElement val year: Long,
    @XmlElement val numberOfFlatsOnFloor: Int
)
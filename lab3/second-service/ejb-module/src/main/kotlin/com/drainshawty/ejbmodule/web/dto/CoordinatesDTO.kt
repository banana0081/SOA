package com.drainshawty.ejbmodule.web.dto

import jakarta.xml.bind.annotation.*


@XmlRootElement(name = "coordinates")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = ["x", "y"])
data class CoordinatesDTO(
    @XmlElement val x: Float,
    @XmlElement val y: Int
)
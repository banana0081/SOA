package com.drainshawty.ejbmodule.web.dto

import jakarta.xml.bind.annotation.XmlAccessType
import jakarta.xml.bind.annotation.XmlAccessorType
import jakarta.xml.bind.annotation.XmlElement
import jakarta.xml.bind.annotation.XmlRootElement

@XmlRootElement(name="Flats")
@XmlAccessorType(XmlAccessType.FIELD)
data class FlatListDTO(
    @XmlElement(name = "Flat") val flat: MutableList<FlatDTO> = mutableListOf(),
    @XmlElement(name="totalFlats") val totalFlats: Int = 0
)
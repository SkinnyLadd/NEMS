package com.car.backend.converters;

import com.car.backend.entities.enums.TicketType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TicketTypeConverter implements AttributeConverter<TicketType, String> {

    @Override
    public String convertToDatabaseColumn(TicketType attribute) {
        if (attribute == null) return null;
        return attribute.name(); // Store as "STANDARD", "VIP", etc.
    }

    @Override
    public TicketType convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return TicketType.valueOf(dbData);
    }
}

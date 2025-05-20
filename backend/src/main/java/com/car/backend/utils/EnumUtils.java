
package com.car.backend.utils;

import com.car.backend.entities.enums.Batch;
import com.car.backend.entities.enums.TicketType;

public class EnumUtils {

    public static TicketType parseTicketType(String typeStr) {
        try {
            return TicketType.valueOf(typeStr.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Invalid ticket type: " + typeStr);
        }
    }

    public static Batch parseBatch(String batchStr) {
        try {
            return Batch.valueOf(batchStr.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Invalid batch: " + batchStr);
        }
    }
}

package com.car.backend.services;

import com.car.backend.DTO.DonationDTO;
import com.car.backend.DTO.DonationRequestDTO;
import com.car.backend.DTO.DonationResponseDTO;
import com.car.backend.entities.Donation;
import com.car.backend.entities.Event;
import com.car.backend.entities.User;
import com.car.backend.repositories.DonationRepository;
import com.car.backend.repositories.EventRepository;
import com.car.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationService {

    @Autowired
    private DonationRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;

    public List<DonationDTO> getDonationsByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DonationDTO> getDonationsByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }



    public DonationDTO saveDonation(DonationDTO dto) {
        Donation entity = convertToEntity(dto);
        Donation savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    public DonationDTO createDonation(DonationRequestDTO request) {
        User user = userRepository.findById(1) // Replace with auth logic
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Donation donation = new Donation();
        donation.setUser(user);
        donation.setEvent(event);
        donation.setAmount(request.getAmount());
        System.out.println("DonatedAtPrev: " + donation.getDonatedAt());

        donation.setDonatedAt(Instant.now());
        System.out.println("DonatedAt: " + donation.getDonatedAt());
        Donation saved = repository.save(donation);

        return convertToDTO(saved);
    }

    public List<DonationResponseDTO> getAllDonations() {
        return repository.findAll().stream().map(donation -> {
            var user = donation.getUser();
            var donor = new DonationResponseDTO.Donor(
                    user.getName(),
                    user.getCms() != null ? user.getCms().toString() : null,
                    user.getCms() != null ? "student" : "other"
            );

            DonationResponseDTO.Event eventDto = null;
            if (donation.getEvent() != null) {
                eventDto = new DonationResponseDTO.Event(
                        donation.getEvent().getId(),
                        donation.getEvent().getTitle(),
                        donation.getEvent().getSociety() != null ? donation.getEvent().getSociety().getSocName() : null
                );
            }

            return new DonationResponseDTO(
                    donation.getId(),
                    donor,
                    eventDto,
                    donation.getAmount().doubleValue(),
                    donation.getDonatedAt().toString()
            );
        }).toList();
    }

    private DonationDTO convertToDTO(Donation entity) {
        DonationDTO dto = new DonationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setEventId(entity.getEvent() != null ? entity.getEvent().getId() : null);
        dto.setAmount(entity.getAmount());
        dto.setDonatedAt(entity.getDonatedAt());
        return dto;
    }

    private Donation convertToEntity(DonationDTO dto) {
        Donation entity = new Donation();
        entity.setId(dto.getId());
        entity.setAmount(dto.getAmount());
        entity.setDonatedAt(dto.getDonatedAt());
        // Set user and event entities as needed
        return entity;
    }


}
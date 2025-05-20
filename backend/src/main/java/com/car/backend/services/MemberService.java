package com.car.backend.services;

import com.car.backend.DTO.MemberDTO;
import com.car.backend.entities.UserSociety;
import com.car.backend.repositories.UserSocietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MemberService {

    @Autowired
    private UserSocietyRepository userSocietyRepository;

    public List<MemberDTO> getAllMembers() {
        List<UserSociety> entries = userSocietyRepository.findAll();

        Map<Integer, MemberDTO> memberMap = new HashMap<>();

        for (UserSociety us : entries) {
            Integer userId = us.getUser().getId();

            MemberDTO dto = memberMap.computeIfAbsent(userId, id -> {
                MemberDTO m = new MemberDTO();
                m.setId(userId);
                m.setName(us.getUser().getName());
                m.setEmail(us.getUser().getEmail());
                m.setSocieties(new ArrayList<>());
                m.setRole(us.getRole().toLowerCase());
                m.setJoinDate(us.getJoinDate().toString());
                m.setStatus(us.getEndDate() == null ? "active" : "inactive");
                return m;
            });

            dto.getSocieties().add(us.getSociety().getSocName());
        }

        return new ArrayList<>(memberMap.values());
    }
}

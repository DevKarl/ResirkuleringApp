package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Bruker;
import com.example.demo.Repositories.BrukerRepo;

@Service
public class BrukerService {

    private final BrukerRepo brukerRepo;

    @Autowired
    public BrukerService(BrukerRepo brukerRepo) {
        this.brukerRepo = brukerRepo;
    }

    /**
     * Persists the provided Bruker entity into the database.
     *
     * @param bruker The user entity to be saved.
     * @return The persisted Bruker entity.
     */
    public Bruker save(Bruker bruker) {
        return brukerRepo.save(bruker);
    }

    /**
     * Retrieves a Bruker based on the provided brukernavn.
     *
     * @param epost The unique username.
     * @return The corresponding Bruker entity or null if not found.
     */
    public Bruker findByEpost(String epost) {
        return brukerRepo.findByEpost(epost);
    }
}

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

    public Bruker save(Bruker bruker) {
        return brukerRepo.save(bruker);
    }

   // brukernavn eller epost HENRIIIIIIIIIK
    public Bruker findByEpost(String epost) {
        return brukerRepo.findByEpost(epost);
    }
}

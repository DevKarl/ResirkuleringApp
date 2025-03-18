package com.example.demo.Repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.Entities.Bruker;

@SpringBootTest
public class BrukerRepoTest {

@Autowired
    private BrukerRepo brukerRepo;


    @Test
    void lagringOgHentingAvBrukere() {
        // Lag ny Bruker
        Bruker bruker = new Bruker();
        bruker.setFornavn("Donald");
        bruker.setEtternavn("duck");
        bruker.setEpost("Donald.duck@epost.no");
        bruker.setHash("fakehash");
        bruker.setSalt("fakesalt");
        bruker.setAdminrettigheter(false);

        // Lagre bruker i repository
        Bruker lagretBruker = brukerRepo.save(bruker);

        // Hent bruker fra repository
        //Optional<Bruker> funnetBruker = brukerRepo.findById(lagretBruker.getId());
        Bruker funnetBruker = brukerRepo.findByEpost("Donald.duck@epost.no");

        // Valider at bruker er korrekt lagret og hentet
        //assertTrue(funnetBruker.isPresent(), "Bruker skulle ha vært tilstede i databasen");
        assertEquals(bruker.getFornavn(), funnetBruker.getFornavn());
        assertEquals(lagretBruker.getEtternavn(), funnetBruker.getEtternavn());
        assertEquals(lagretBruker.getEpost(), funnetBruker.getEpost());

        Integer id = bruker.getId();
        brukerRepo.deleteById(id);

    }


}

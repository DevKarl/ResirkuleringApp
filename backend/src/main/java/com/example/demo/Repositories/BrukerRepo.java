package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Bruker;

@Repository
public interface BrukerRepo extends JpaRepository<Bruker, Integer> {
    //her må også se an med henrik om epost eller brukernavn
    Bruker findByEpost(String epost);
}

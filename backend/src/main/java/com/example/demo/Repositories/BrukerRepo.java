package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Bruker;

@Repository
public interface BrukerRepo extends JpaRepository<Bruker, Integer> {
    // Custom finder method to locate a user by their unique email
    Bruker findByEpost(String epost);
}

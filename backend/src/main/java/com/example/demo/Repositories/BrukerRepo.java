package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.Bruker;


public interface BrukerRepo extends JpaRepository<Bruker, Integer> {

    
} 
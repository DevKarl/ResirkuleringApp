package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.Avfallspunkt;


public interface AvfallspunktRepo extends JpaRepository<Avfallspunkt, Integer>{
  
}

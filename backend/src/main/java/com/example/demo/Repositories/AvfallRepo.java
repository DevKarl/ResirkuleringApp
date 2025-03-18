package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.Avfall;

public interface AvfallRepo extends JpaRepository<Avfall,Integer> {
  
  Avfall findByStrekkode(String strekkode);
}



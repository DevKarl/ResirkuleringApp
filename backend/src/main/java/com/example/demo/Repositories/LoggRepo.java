package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.Resirkuleringslogg;

public interface LoggRepo extends JpaRepository<Resirkuleringslogg, Integer>{
  
}

package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.Logg;

public interface LoggRepo extends JpaRepository<Logg, Integer>{
  
}

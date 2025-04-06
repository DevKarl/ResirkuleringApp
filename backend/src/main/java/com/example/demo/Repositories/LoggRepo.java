package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Resirkuleringslogg;


@Repository
public interface LoggRepo extends JpaRepository<Resirkuleringslogg, Integer>{
  List<Resirkuleringslogg> findByBruker_id(int id);
}

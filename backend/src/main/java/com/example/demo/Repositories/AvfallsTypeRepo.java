package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.AvfallsType;

@Repository
public interface AvfallsTypeRepo extends JpaRepository<AvfallsType, Integer> {
  List<AvfallsType> findByAvfallspunktAvfallstyper_Avfallspunkt_Id(int avfallsPunktId);
}

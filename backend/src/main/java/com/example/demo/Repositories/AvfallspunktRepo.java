package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entities.Avfallspunkt;

@Repository
public interface AvfallspunktRepo extends JpaRepository<Avfallspunkt, Integer> {
  List<Avfallspunkt> findByAvfallspunktAvfallstyper_Avfallstype_Id(int avfallstypeId);
}

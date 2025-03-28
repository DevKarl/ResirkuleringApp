package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Repositories.LoggRepo;

@Service
public class LoggService {

  @Autowired
  private LoggRepo loggRepo;

  public List<Resirkuleringslogg> getAlleLoggerForBrukerMedId(int id) {
    
    return loggRepo.findByBruker_id(id);
    
  }

  public void hivAvfall(Resirkuleringslogg logg) {
    // TODO Auto-generated method stub
    // Avfall avfall = AvfallRepo.findByStrekkode(avfallsid);
    // Resirkuleringslogg logg = new Resirkuleringslogg(avfallsid, brukerid, avfallspunktid, localdate);
    loggRepo.save(logg);
    // throw new UnsupportedOperationException("Unimplemented method 'hivAvfall'");
    return;
  }
    
}

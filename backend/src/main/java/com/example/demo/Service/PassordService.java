package com.example.demo.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.HexFormat;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.stereotype.Service;

@Service
public class PassordService {
  // here the great rapper SHA kramelnjekk creates binarual beat hasj bæsj
  public String genererSalt() {
    SecureRandom sr;
    byte[] salt = new byte[16];
    try {
      sr = SecureRandom.getInstance("SHA1PRNG");
      sr.nextBytes(salt);
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return HexFormat.of().formatHex(salt);
  }

  public String hashMedSalt(String passord, String salt) {
    if (passord == null || salt == null) {
      throw new IllegalArgumentException("Passord and salt must not be null");
    }
    char[] passChar = passord.toCharArray();
    byte[] saltBytes = HexFormat.of().parseHex(salt);
    byte[] keyhash = null;
    try {
      PBEKeySpec pks = new PBEKeySpec(passChar, saltBytes, 1000, 256);
      SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
      keyhash = skf.generateSecret(pks).getEncoded();
    } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
        e.printStackTrace();
    }
    return HexFormat.of().formatHex(keyhash);
  }
  
  public boolean erKorrektPassord(String passord, String salt, String hash) {
    if (passord == null || salt == null || hash == null) {
      throw new IllegalArgumentException("Input values must not be null");
    }
    return hash.equals(hashMedSalt(passord, salt));
  }
}

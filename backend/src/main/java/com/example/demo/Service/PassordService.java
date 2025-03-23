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

    /**
     * Generates a random 16-byte salt using SHA1PRNG.
     */
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

    /**
     * Hashes the given password with the provided salt using PBKDF2WithHmacSHA1.
     * Iterates 1000 times and produces a 256-bit (32-byte) hash.
     *
     * @param passord The password to hash.
     * @param salt    The salt as a hexadecimal string.
     * @return A 64-character hexadecimal string representing the hashed password.
     */
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

    /**
     * Verifies if the provided password, when hashed with the given salt, matches the stored hash.
     *
     * @param passord The plain text password to check.
     * @param salt    The salt used to hash the original password.
     * @param hash    The stored hash.
     * @return true if the password is correct; false otherwise.
     */
    public boolean erKorrektPassord(String passord, String salt, String hash) {
        if (passord == null || salt == null || hash == null) {
            throw new IllegalArgumentException("Input values must not be null");
        }
        return hash.equals(hashMedSalt(passord, salt));
    }
}

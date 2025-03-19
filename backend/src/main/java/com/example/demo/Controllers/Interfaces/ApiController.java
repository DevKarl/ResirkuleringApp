package com.example.demo.Controllers.Interfaces;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@RestController
@RequestMapping("/api")
public @interface ApiController {
}
package br.com.calculadorahoras.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class Controller {

    @GetMapping("/")
    public String testConfig(){
        return "Hello World!";
    }
}

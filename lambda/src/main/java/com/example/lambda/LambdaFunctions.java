package com.example.lambda;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class LambdaFunctions {

    @Bean
    public Function<String, String> handler() {
        return input -> {
            String stage = System.getenv("stageName");
            return "Stage name is " + stage + ". Response: Hello Lambda from Spring Cloud Function!";
        };
    }
}

package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;

    // Конструктор по умолчанию
    public Product() {
    }

    // Конструктор с параметрами
    public Product(String name, Double price) {
        this.name = name;
        this.price = price;
    }

    // Геттер для id
    public Long getId() {
        return id;
    }

    // Сеттер для id
    public void setId(Long id) {
        this.id = id;
    }

    // Геттер для name
    public String getName() {
        return name;
    }

    // Сеттер для name
    public void setName(String name) {
        this.name = name;
    }

    // Геттер для price
    public Double getPrice() {
        return price;
    }

    // Сеттер для price
    public void setPrice(Double price) {
        this.price = price;
    }
}